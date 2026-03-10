from __future__ import annotations

import datetime as dt
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / 'data' / 'players' / 'github-config.json'
OUTPUT_PATH = ROOT / 'data' / 'players' / 'github-leaderboard.json'
SEARCH_API = 'https://api.github.com/search/issues'
API_ROOT = 'https://api.github.com'
USER_AGENT = 'eluma-github-school-sync'


def load_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding='utf-8-sig'))


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')


def utc_now() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')


def resolve_token() -> tuple[str, str]:
    for env_name, mode in (
        ('ELUMA_GITHUB_SCHOOL_TOKEN', 'personal-token'),
        ('GH_LEADERBOARD_TOKEN', 'custom-token'),
        ('GITHUB_TOKEN', 'github-token'),
    ):
        token = os.getenv(env_name, '').strip()
        if token:
            return token, mode
    return '', 'none'


def is_placeholder_username(username: str) -> bool:
    lowered = username.strip().lower()
    return not lowered or 'placeholder' in lowered or lowered in {'tbd', 'todo', 'username-here'}


def resolve_primary_repo(scope: dict[str, Any]) -> str:
    configured = str(scope.get('primary_repo') or '').strip()
    env_repo = os.getenv('GITHUB_REPOSITORY', '').strip()
    if configured and '/' in configured:
        return configured
    if env_repo and configured and env_repo.rsplit('/', 1)[-1].lower() == configured.lower():
        return env_repo
    return env_repo or configured


class GitHubClient:
    def __init__(self, token: str) -> None:
        self.token = token

    def get_json(self, url: str, params: dict[str, Any] | None = None) -> Any:
        if params:
            url = f"{url}?{urllib.parse.urlencode(params)}"
        headers = {
            'Accept': 'application/vnd.github+json',
            'User-Agent': USER_AGENT,
        }
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        request = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode('utf-8')
        return json.loads(body) if body else {}

    def search_issue_count(self, query: str) -> int:
        payload = self.get_json(SEARCH_API, {'q': query, 'per_page': 1})
        return int(payload.get('total_count', 0))

    def count_repo_commits(self, repo: str, username: str, max_pages: int) -> int:
        total = 0
        for page in range(1, max_pages + 1):
            payload = self.get_json(
                f'{API_ROOT}/repos/{repo}/commits',
                {'author': username, 'per_page': 100, 'page': page},
            )
            if not isinstance(payload, list):
                break
            total += len(payload)
            if len(payload) < 100:
                break
        return total


def zero_player(player_id: str, username: str, scope_label: str, status: str, note: str = '') -> dict[str, Any]:
    return {
        'id': player_id,
        'github_username': username,
        'github_score': 0,
        'pull_requests': 0,
        'merged_pull_requests': 0,
        'reviews': 0,
        'commits': 0,
        'issues': 0,
        'comments': 0,
        'status': status,
        'scope': scope_label,
        'note': note,
    }


def score_player(metrics: dict[str, int], scoring: dict[str, Any]) -> int:
    opened_prs = max(0, metrics['pull_requests'] - metrics['merged_pull_requests'])
    return (
        metrics['merged_pull_requests'] * int(scoring.get('merged_pr', 0))
        + opened_prs * int(scoring.get('pull_request_opened', 0))
        + metrics['reviews'] * int(scoring.get('review', 0))
        + metrics['commits'] * int(scoring.get('commit', 0))
        + metrics['issues'] * int(scoring.get('issue', 0))
        + metrics['comments'] * int(scoring.get('comment', 0))
    )


def build_queries(username: str, scope_mode: str, resolved_repo: str) -> dict[str, str]:
    repo_filter = f'repo:{resolved_repo} ' if scope_mode == 'eluma-only' and resolved_repo else ''
    return {
        'pull_requests': f'{repo_filter}type:pr author:{username}',
        'merged_pull_requests': f'{repo_filter}type:pr author:{username} is:merged',
        'reviews': f'{repo_filter}type:pr reviewed-by:{username}',
        'issues': f'{repo_filter}type:issue author:{username}',
        'comments': f'{repo_filter}commenter:{username}',
    }


def sync_players(config: dict[str, Any]) -> dict[str, Any]:
    token, token_mode = resolve_token()
    client = GitHubClient(token)
    scope = config.get('scope', {})
    scope_mode = str(scope.get('active') or 'all-repos')
    resolved_repo = resolve_primary_repo(scope)
    scoring = config.get('scoring', {})
    max_commit_pages = int(scoring.get('max_commit_pages', 10))
    notes = [
        'All-repos mode uses GitHub search counts. Commit scoring is only filled in eluma-only mode.',
        'Set the ELUMA_GITHUB_SCHOOL_TOKEN secret for reliable private-repo coverage across accounts.',
    ]

    players = []
    for player_id, details in (config.get('players') or {}).items():
        username = str((details or {}).get('github_username') or '').strip()
        if is_placeholder_username(username):
            players.append(zero_player(player_id, username or f'{player_id}-placeholder', scope_mode, 'placeholder', 'Username placeholder active.'))
            continue
        if not token:
            players.append(zero_player(player_id, username, scope_mode, 'token-missing', 'No GitHub token available for sync.'))
            continue

        try:
            queries = build_queries(username, scope_mode, resolved_repo)
            metrics = {name: client.search_issue_count(query) for name, query in queries.items()}
            metrics['commits'] = client.count_repo_commits(resolved_repo, username, max_commit_pages) if scope_mode == 'eluma-only' and resolved_repo else 0
            github_score = score_player(metrics, scoring)
            players.append(
                {
                    'id': player_id,
                    'github_username': username,
                    'github_score': github_score,
                    'pull_requests': metrics['pull_requests'],
                    'merged_pull_requests': metrics['merged_pull_requests'],
                    'reviews': metrics['reviews'],
                    'commits': metrics['commits'],
                    'issues': metrics['issues'],
                    'comments': metrics['comments'],
                    'status': 'synced',
                    'scope': scope_mode,
                    'note': 'Live sync completed.',
                }
            )
        except urllib.error.HTTPError as error:
            note = f'GitHub API error {error.code} while syncing {username}.'
            players.append(zero_player(player_id, username, scope_mode, 'error', note))
        except Exception as error:
            players.append(zero_player(player_id, username, scope_mode, 'error', f'Sync failed: {error}'))

    return {
        'updated_at': utc_now(),
        'source': 'github-sync-script',
        'token_mode': token_mode,
        'scope': {
            'active': scope_mode,
            'primary_repo': scope.get('primary_repo', 'Eluma-Github-School'),
            'resolved_repo': resolved_repo,
        },
        'players': players,
        'notes': notes,
    }


def main() -> int:
    config = load_json(CONFIG_PATH)
    payload = sync_players(config)
    write_json(OUTPUT_PATH, payload)
    print(f'Updated {OUTPUT_PATH} for {len(payload.get("players", []))} players.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
