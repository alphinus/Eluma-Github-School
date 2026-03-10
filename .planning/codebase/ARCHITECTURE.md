# Architecture Map

## System Summary
- The runtime is a buildless static web app composed of `C:\Dev\Eluma-Github-School\index.html`, `C:\Dev\Eluma-Github-School\styles.css`, and `C:\Dev\Eluma-Github-School\app.js`.
- The repository also acts as a learning and collaboration system, so architecture spans both the browser UI and the surrounding docs/data workflow under `docs/`, `data/`, and `.github/`.
- Deployment assumptions are simple: open `index.html` locally or publish the root on GitHub Pages.
- There is no backend, package manager, bundler, router, or test harness in the current implementation.

## Entry Points
- Browser entry starts at `C:\Dev\Eluma-Github-School\index.html`, which declares the full page shell, section markup, control IDs, and a trailing `<script src="app.js"></script>`.
- Styling is centralized in `C:\Dev\Eluma-Github-School\styles.css`; the JavaScript mutates CSS custom properties instead of swapping stylesheets.
- Runtime behavior starts in `document.addEventListener('DOMContentLoaded', ...)` inside `C:\Dev\Eluma-Github-School\app.js`.
- Content/data entry points are `C:\Dev\Eluma-Github-School\data\config\categories.json`, `C:\Dev\Eluma-Github-School\data\ideas\ideas_merged.csv`, and `C:\Dev\Eluma-Github-School\data\missions\missions.json`.

## Initialization Sequence
1. `DOMContentLoaded` triggers `initNavigation()`.
2. The app enables mission level tabs through `initLevelTabs()`.
3. Playground controls are wired via `initPlayground()`.
4. `loadCategories()` fetches category metadata first so filter options and badge colors have lookup data.
5. `loadIdeas()` fetches and parses the merged CSV, then immediately renders idea cards.
6. `initIdeaFilters()` attaches change listeners after the initial dataset is available.
7. `loadMissions()` fetches mission metadata and renders the mission grid.
8. `initGlossarLinks()` connects glossary links to mission filtering.
9. `updateNextMission()` reads the first mission as a lightweight “next mission” signal.

## Layering Model
- Presentation layer: semantic sections and interactive controls live in `C:\Dev\Eluma-Github-School\index.html`.
- Styling layer: design tokens, layout primitives, card patterns, and responsive tweaks live in `C:\Dev\Eluma-Github-School\styles.css`.
- Interaction layer: all state, event binding, fetch logic, filtering, and rendering live in `C:\Dev\Eluma-Github-School\app.js`.
- Content layer: JSON and CSV assets under `C:\Dev\Eluma-Github-School\data\` feed the UI; markdown under `C:\Dev\Eluma-Github-School\docs\` supports the learning system but is not dynamically loaded by the app.

## Client State And Data Flow
- Global mutable arrays `ideasData`, `categoriesData`, and `missionsData` are the only app state stores in `C:\Dev\Eluma-Github-School\app.js`.
- Fetch flow for categories: JSON -> `categoriesData` -> populate `#filter-category` -> later used by `renderIdeas()` for badge coloring.
- Fetch flow for ideas: CSV text -> `parseCSV()` -> `ideasData` -> `renderIdeas()` -> HTML string injection into `#ideas-grid`.
- Fetch flow for missions: JSON -> `missionsData` -> `renderMissions()` -> HTML string injection into `#missions-grid`.
- Filter flow: select change events derive a filtered subset from `ideasData` and re-render the entire ideas grid.
- Navigation flow: nav button `data-section` values determine which `.section` receives the `active` class.
- Cross-section flow: glossary links use `data-mission` to derive the mission level, switch to the missions section, activate the matching level tab, and render a filtered mission list.

## UI Composition
- `welcome` is a static summary panel with one dynamic slot: `#next-mission`.
- `ideenboard` combines three select filters with a card grid fed from CSV content.
- `playground` is a self-contained practice surface with four exercises: theme switcher, magic button editor, status badge editor, and hidden test card toggle.
- `glossar` uses native `<details>` elements for expandable learning content and acts as a navigation bridge into the missions view.
- `missionen` uses level tabs plus a renderable grid of mission cards sourced from JSON.
- Reusable visual composition is card-centric; `styles.css` defines one main card/grid system reused across ideas, missions, glossary blocks, and playground widgets.

## Data Contracts In Use
- `C:\Dev\Eluma-Github-School\data\config\categories.json` provides category `name` and `color`, which the UI treats as the canonical lookup for idea badges.
- `C:\Dev\Eluma-Github-School\data\missions\missions.json` provides level, title, story, objective, files to edit, acceptance criteria, GitHub skill, difficulty, and prerequisites.
- `C:\Dev\Eluma-Github-School\data\ideas\ideas_merged.csv` is the only ideas dataset actually loaded by the app at runtime.
- `C:\Dev\Eluma-Github-School\data\ideas\ideas_mario.csv` and `C:\Dev\Eluma-Github-School\data\ideas\ideas_elvis.csv` exist as source material but are not consumed directly by `app.js`.
- `C:\Dev\Eluma-Github-School\data\config\theme.json` exists, but the runtime currently ignores it in favor of the hard-coded `THEMES` constant in `C:\Dev\Eluma-Github-School\app.js`.

## Architectural Strengths
- The app is easy to run, inspect, and teach because the entire runtime fits in three top-level files.
- IDs and `data-*` attributes in `C:\Dev\Eluma-Github-School\index.html` make event binding straightforward and explicit.
- JSON/CSV assets are human-editable, which aligns with the repository’s learning goals.
- The app cleanly separates static documentation in `docs/` from interactive experience in the root app files.

## Architectural Constraints And Risks
- `parseCSV()` in `C:\Dev\Eluma-Github-School\app.js` splits only on commas and newlines, so quoted commas or multiline fields will break parsing.
- Rendering uses `innerHTML` for ideas and missions, which keeps the code short but couples markup generation tightly to raw data.
- All state is global and file-local; as features grow, section behavior and data loading will become harder to isolate.
- Initialization is mostly sequential even where fetches could be parallelized.
- Local `file://` execution may hit browser restrictions around `fetch()` depending on browser security settings; the architecture assumes a permissive local setup or static hosting.
- There is no schema validation for JSON/CSV inputs, so malformed content fails late in the browser.

## Actionable Follow-Ups
- Move theme configuration to `C:\Dev\Eluma-Github-School\data\config\theme.json` or remove the unused file to avoid split sources of truth.
- Replace the naive CSV parser in `C:\Dev\Eluma-Github-School\app.js` with a parser that handles quoted values safely.
- Extract section-specific modules if `app.js` grows beyond its current single-file scope.
- Add lightweight data validation for `categories.json`, `missions.json`, and `ideas_merged.csv` before render time.
- Decide whether the intended local run mode is GitHub Pages/local static server rather than direct `file://` opening, then document that choice consistently.
