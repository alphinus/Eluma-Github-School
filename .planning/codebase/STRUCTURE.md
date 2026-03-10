# Structure Map

## Top-Level Layout
- `C:\Dev\Eluma-Github-School\index.html` is the page shell and the only HTML entry point.
- `C:\Dev\Eluma-Github-School\styles.css` contains all design tokens, layout rules, and responsive behavior.
- `C:\Dev\Eluma-Github-School\app.js` contains all client logic, fetches, state, and DOM updates.
- `C:\Dev\Eluma-Github-School\README.md` is the main onboarding and project overview document.
- `C:\Dev\Eluma-Github-School\CONTRIBUTING.md`, `C:\Dev\Eluma-Github-School\CODE_OF_CONDUCT.md`, and `C:\Dev\Eluma-Github-School\LICENSE` define collaboration and repo governance.

## Directory Breakdown
- `C:\Dev\Eluma-Github-School\.github\` stores repository workflow artifacts such as `pull_request_template.md` and issue templates under `ISSUE_TEMPLATE\`.
- `C:\Dev\Eluma-Github-School\.planning\codebase\` is reserved for generated codebase maps like this one.
- `C:\Dev\Eluma-Github-School\docs\` holds the human-readable learning system, product framing, and collaboration rules.
- `C:\Dev\Eluma-Github-School\data\` holds runtime content and source datasets.
- `C:\Dev\Eluma-Github-School\assets\` is prepared for media but currently empty apart from `.gitkeep`.
- `C:\Dev\Eluma-Github-School\sandbox\` is reserved for experiments and isolated practice areas.
- `C:\Dev\Eluma-Github-School\archive\completed-missions\` is the long-term storage area for finished mission artifacts.

## Runtime-Relevant Structure
- The browser app reads only from root files plus selected files under `C:\Dev\Eluma-Github-School\data\`.
- `C:\Dev\Eluma-Github-School\data\config\categories.json` is runtime-active.
- `C:\Dev\Eluma-Github-School\data\missions\missions.json` is runtime-active.
- `C:\Dev\Eluma-Github-School\data\ideas\ideas_merged.csv` is runtime-active.
- `C:\Dev\Eluma-Github-School\data\config\theme.json` is present but not wired into the current app.
- Most markdown in `C:\Dev\Eluma-Github-School\docs\` is organizational content for humans, not fetched by the app.

## Document Organization
- `C:\Dev\Eluma-Github-School\docs\prd.md` is the canonical product and repository design reference; it is the deepest planning artifact in the repo.
- `C:\Dev\Eluma-Github-School\docs\learning-path.md` sequences the training journey across five levels.
- `C:\Dev\Eluma-Github-School\docs\mission-map.md` mirrors the mission system in a browsable document format.
- `C:\Dev\Eluma-Github-School\docs\glossary.md` maps Git/GitHub terms to learner-friendly explanations and links conceptually into the UI glossary section.
- `C:\Dev\Eluma-Github-School\docs\branch-strategy.md`, `C:\Dev\Eluma-Github-School\docs\team-rules.md`, and `C:\Dev\Eluma-Github-School\docs\conflict-lab.md` cover collaboration policy and hands-on exercises.
- The docs folder is organized by topic rather than by audience or lifecycle stage, which works at current scale but will get harder to scan as the corpus grows.

## Data Organization
- `C:\Dev\Eluma-Github-School\data\config\` contains configuration-like assets such as categories and themes.
- `C:\Dev\Eluma-Github-School\data\ideas\` contains both source idea datasets (`ideas_mario.csv`, `ideas_elvis.csv`) and the merged runtime view (`ideas_merged.csv`).
- `C:\Dev\Eluma-Github-School\data\missions\missions.json` is a single consolidated mission catalog.
- The data tree reflects a good separation between config, ideas, and missions, but there is no explicit normalization or generation pipeline checked into the repo.

## UI-To-Repo Mapping
- The `Welcome` section in `C:\Dev\Eluma-Github-School\index.html` is backed by mission ordering from `C:\Dev\Eluma-Github-School\data\missions\missions.json`.
- The `Ideenboard` section maps to `C:\Dev\Eluma-Github-School\data\ideas\ideas_merged.csv` plus `C:\Dev\Eluma-Github-School\data\config\categories.json`.
- The `Playground` section is self-contained and depends only on DOM structure in `C:\Dev\Eluma-Github-School\index.html`, behavior in `C:\Dev\Eluma-Github-School\app.js`, and tokens in `C:\Dev\Eluma-Github-School\styles.css`.
- The `Glossar` section is hard-coded in `C:\Dev\Eluma-Github-School\index.html` while its fuller written counterpart lives in `C:\Dev\Eluma-Github-School\docs\glossary.md`.
- The `Missionen` section maps directly to `C:\Dev\Eluma-Github-School\data\missions\missions.json` and conceptually aligns with `C:\Dev\Eluma-Github-School\docs\mission-map.md`.

## Structural Patterns
- Root-level app files indicate a GitHub Pages-friendly, zero-build publishing model.
- Folder naming is descriptive and learner-friendly, which matches the repo’s educational purpose.
- `.gitkeep` placeholders in `assets/`, `sandbox/`, `archive/`, and parts of `data/` show intentional scaffolding for future expansion.
- Content is split between machine-consumed data (`data/`) and human-consumed guidance (`docs/`), which is the repo’s main organizational seam.
- There is no `src/`, `components/`, or service layer yet; structure favors discoverability over modular depth.

## Navigation Guidance For Future Workers
- Start with `C:\Dev\Eluma-Github-School\README.md` for repo purpose and expected workflow.
- Read `C:\Dev\Eluma-Github-School\docs\prd.md` if you need intent, boundaries, or future-direction context before changing structure.
- Inspect `C:\Dev\Eluma-Github-School\app.js` before editing any runtime behavior because all interactivity is centralized there.
- Inspect `C:\Dev\Eluma-Github-School\data\` before adding UI features; many changes will need parallel updates to content contracts.
- Check `C:\Dev\Eluma-Github-School\.github\` before altering collaboration flows because templates are part of the teaching system.

## Structural Gaps And Recommendations
- Add a clear rule for when content belongs in `docs/` versus `data/`, because some concepts exist in both static prose and app-visible form.
- Decide whether `theme.json` should become authoritative or be removed to keep structure honest.
- Consider a generated/derived-data convention if `ideas_merged.csv` is expected to be rebuilt from per-person source files.
- If the app expands, introduce a small `src/` or feature-folder structure rather than continuing to grow `app.js` monolithically.
- If documentation volume keeps increasing, split `docs/` into subfolders such as `learning/`, `governance/`, and `product/` for faster scanning.
