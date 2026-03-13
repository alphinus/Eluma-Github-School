"""Auto-verify mission completion from PR metadata.

Triggered by GitHub Actions on PR events. Checks branch name, changed files,
PR reviews, and other criteria against mission definitions. Writes verified
completions to data/players/mission-progress.json.
"""
from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
MISSIONS_PATH = ROOT / 'data' / 'missions' / 'missions.json'
CONFIG_PATH = ROOT / 'data' / 'players' / 'github-config.json'
PROGRESS_PATH = ROOT / 'data' / 'players' / 'mission-progress.json'
API_ROOT = 'https://api.github.com'
USER_AGENT = 'eluma-mission-verifier'

# Branch pattern → mission ID mapping
BRANCH_RULES: list[dict[str, Any]] = [
    {'mission': 'L1-M1', 'branch_pattern': r'mission/level-?1.*button', 'requires_files': ['styles.css'], 'requires_pr': True},
    {'mission': 'L1-M2', 'branch_pattern': r'mission/level-?1.*welcome|mission/level-?1.*startseite|mission/level-?1.*überschrift', 'requires_files': ['index.html'], 'requires_pr': True},
    {'mission': 'L1-M3', 'branch_pattern': r'mission/level-?1.*idee', 'requires_files': ['data/ideas/ideas_merged.csv'], 'requires_pr': True},
    {'mission': 'L1-M5', 'branch_pattern': r'mission/level-?1.*readme', 'requires_files': ['README.md'], 'requires_pr': True},
    {'mission': 'L2-M2', 'branch_pattern': r'mission/level-?2.*push', 'requires_pr': True},
    {'mission': 'L2-M4', 'branch_pattern': r'.*', 'requires_review_then_commit': True},
    {'mission': 'L3-M1', 'branch_pattern': r'^idea/', 'requires_files': ['data/ideas/ideas_merged.csv'], 'requires_pr': True},
    {'mission': 'L3-M2', 'branch_pattern': r'^feature/', 'requires_files_any': ['styles.css', 'index.html'], 'requires_pr': True},
    {'mission': 'L3-M3', 'branch_pattern': r'^fix/', 'requires_pr': True},
    {'mission': 'L4-M1', 'branch_pattern': r'conflict/.*header|conflict/.*title', 'requires_files': ['index.html'], 'requires_merged': True},
    {'mission': 'L4-M2', 'branch_pattern': r'conflict/.*csv', 'requires_files': ['data/ideas/ideas_merged.csv'], 'requires_merged': True},
    {'mission': 'L5-M1', 'branch_pattern': r'.*', 'requires_pr_description_quality': True},
    {'mission': 'L5-M2', 'branch_pattern': r'.*', 'requires_review_given': True},
    {'mission': 'L5-M3', 'branch_pattern': r'.*', 'requires_changes_requested': True},
    {'mission': 'L5-M4', 'branch_pattern': r'.*', 'requires_review_cycle_complete': True},
]


def load_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding='utf-8-sig'))


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')


def resolve_player(username: str, config: dict[str, Any]) -> str | None:
    players = config.get('players', {})
    for player_id, details in players.items():
        gh_user = (details or {}).get('github_username', '').strip()
        if gh_user.lower() == username.lower():
            return player_id
        for alias in (details or {}).get('aliases', []):
            if alias.lower() == username.lower():
                return player_id
    return None


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
            return json.loads(response.read().decode('utf-8'))

    def get_pr_files(self, repo: str, pr_number: int) -> list[str]:
        files = self.get_json(f'{API_ROOT}/repos/{repo}/pulls/{pr_number}/files', {'per_page': 100})
        return [f['filename'] for f in files] if isinstance(files, list) else []

    def get_pr_reviews(self, repo: str, pr_number: int) -> list[dict[str, Any]]:
        reviews = self.get_json(f'{API_ROOT}/repos/{repo}/pulls/{pr_number}/reviews', {'per_page': 100})
        return reviews if isinstance(reviews, list) else []

    def get_pr_commits(self, repo: str, pr_number: int) -> list[dict[str, Any]]:
        commits = self.get_json(f'{API_ROOT}/repos/{repo}/pulls/{pr_number}/commits', {'per_page': 100})
        return commits if isinstance(commits, list) else []


def check_mission(rule: dict[str, Any], context: dict[str, Any]) -> dict[str, Any]:
    """Check if a PR satisfies a mission rule. Returns criteria met."""
    branch = context['branch']
    criteria_met = []
    criteria_failed = []

    if not re.search(rule['branch_pattern'], branch, re.IGNORECASE):
        return {'match': False, 'reason': 'branch_mismatch'}

    criteria_met.append(f"Branch '{branch}' matches pattern")

    if rule.get('requires_files'):
        changed = set(context.get('files', []))
        required = set(rule['requires_files'])
        if required & changed:
            criteria_met.append(f"Required files changed: {required & changed}")
        else:
            criteria_failed.append(f"Missing file changes: {required}")
            return {'match': False, 'reason': 'missing_files', 'criteria_met': criteria_met, 'criteria_failed': criteria_failed}

    if rule.get('requires_files_any'):
        changed = set(context.get('files', []))
        any_of = set(rule['requires_files_any'])
        if any_of & changed:
            criteria_met.append(f"At least one target file changed: {any_of & changed}")
        else:
            criteria_failed.append(f"None of target files changed: {any_of}")
            return {'match': False, 'reason': 'missing_files', 'criteria_met': criteria_met, 'criteria_failed': criteria_failed}

    if rule.get('requires_pr'):
        criteria_met.append('PR opened')

    if rule.get('requires_merged') and not context.get('merged'):
        criteria_failed.append('PR not yet merged')
        return {'match': False, 'reason': 'not_merged', 'criteria_met': criteria_met, 'criteria_failed': criteria_failed}
    elif rule.get('requires_merged'):
        criteria_met.append('PR merged')

    if rule.get('requires_pr_description_quality'):
        body = context.get('body', '')
        if len(body) >= 50 and any(kw in body.lower() for kw in ['was', 'what', 'warum', 'why', 'änderung', 'change']):
            criteria_met.append('PR description meets quality bar')
        else:
            criteria_failed.append('PR description too short or missing context')
            return {'match': False, 'reason': 'weak_description', 'criteria_met': criteria_met, 'criteria_failed': criteria_failed}

    if rule.get('requires_review_given'):
        reviews = context.get('reviews', [])
        pr_author = context.get('author', '').lower()
        given = [r for r in reviews if r.get('user', {}).get('login', '').lower() == context.get('current_user', '').lower() and r.get('user', {}).get('login', '').lower() != pr_author]
        if given:
            criteria_met.append('Review comment given on another PR')
        else:
            criteria_failed.append('No review given by this user')
            return {'match': False, 'reason': 'no_review', 'criteria_met': criteria_met, 'criteria_failed': criteria_failed}

    if rule.get('requires_changes_requested'):
        reviews = context.get('reviews', [])
        changes_requested = [r for r in reviews if r.get('state') == 'CHANGES_REQUESTED' and r.get('user', {}).get('login', '').lower() == context.get('current_user', '').lower()]
        if changes_requested:
            criteria_met.append('Request Changes used')
        else:
            criteria_failed.append('No CHANGES_REQUESTED review from this user')
            return {'match': False, 'reason': 'no_changes_requested', 'criteria_met': criteria_met, 'criteria_failed': criteria_failed}

    if rule.get('requires_review_cycle_complete'):
        reviews = context.get('reviews', [])
        has_changes_requested = any(r.get('state') == 'CHANGES_REQUESTED' for r in reviews)
        has_approved = any(r.get('state') == 'APPROVED' for r in reviews)
        if has_changes_requested and has_approved and context.get('merged'):
            criteria_met.append('Full review cycle: changes requested → approved → merged')
        else:
            missing = []
            if not has_changes_requested:
                missing.append('no changes_requested')
            if not has_approved:
                missing.append('no approval')
            if not context.get('merged'):
                missing.append('not merged')
            criteria_failed.append(f"Incomplete review cycle: {', '.join(missing)}")
            return {'match': False, 'reason': 'incomplete_cycle', 'criteria_met': criteria_met, 'criteria_failed': criteria_failed}

    if rule.get('requires_review_then_commit'):
        reviews = context.get('reviews', [])
        commits = context.get('commits', [])
        if reviews and len(commits) >= 2:
            criteria_met.append('PR updated after review feedback')
        else:
            criteria_failed.append('Need review + subsequent commit')
            return {'match': False, 'reason': 'no_post_review_commit', 'criteria_met': criteria_met, 'criteria_failed': criteria_failed}

    return {'match': True, 'criteria_met': criteria_met}


def main() -> int:
    pr_number = int(os.environ.get('PR_NUMBER', '0'))
    pr_branch = os.environ.get('PR_BRANCH', '')
    pr_author = os.environ.get('PR_AUTHOR', '')
    pr_merged = os.environ.get('PR_MERGED', 'false') == 'true'
    pr_body = os.environ.get('PR_BODY', '')
    repo = os.environ.get('GITHUB_REPOSITORY', '')
    token = os.environ.get('GITHUB_TOKEN', os.environ.get('ELUMA_GITHUB_SCHOOL_TOKEN', ''))

    if not pr_number or not pr_branch or not pr_author:
        print('Missing PR metadata. Skipping verification.')
        return 0

    config = load_json(CONFIG_PATH)
    player_id = resolve_player(pr_author, config)
    if not player_id:
        print(f'Author {pr_author} is not a registered player. Skipping.')
        return 0

    print(f'Verifying PR #{pr_number} by {pr_author} (player: {player_id})')
    print(f'Branch: {pr_branch}, Merged: {pr_merged}')

    client = GitHubClient(token)
    files = client.get_pr_files(repo, pr_number) if token else []
    reviews = client.get_pr_reviews(repo, pr_number) if token else []
    commits = client.get_pr_commits(repo, pr_number) if token else []

    print(f'Files changed: {files}')
    print(f'Reviews: {len(reviews)}, Commits: {len(commits)}')

    context = {
        'branch': pr_branch,
        'files': files,
        'reviews': reviews,
        'commits': commits,
        'merged': pr_merged,
        'author': pr_author,
        'body': pr_body,
        'current_user': pr_author,
    }

    progress = load_json(PROGRESS_PATH)
    if 'players' not in progress:
        progress = {'players': {}}
    if player_id not in progress['players']:
        progress['players'][player_id] = {'verified_missions': {}}

    player_progress = progress['players'][player_id]['verified_missions']
    newly_verified = []

    for rule in BRANCH_RULES:
        mission_id = rule['mission']
        if mission_id in player_progress:
            continue

        result = check_mission(rule, context)
        if result['match']:
            player_progress[mission_id] = {
                'pr_number': pr_number,
                'branch': pr_branch,
                'criteria_met': result['criteria_met'],
            }
            newly_verified.append(mission_id)
            print(f'VERIFIED: {mission_id} — {result["criteria_met"]}')

    if newly_verified:
        write_json(PROGRESS_PATH, progress)
        print(f'\nNewly verified missions: {newly_verified}')
    else:
        print('\nNo new missions verified from this PR.')

    return 0


if __name__ == '__main__':
    raise SystemExit(main())
