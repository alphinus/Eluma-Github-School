# Branch-Strategie

## Übersicht

```
main (stabil, live auf GitHub Pages)
 ├── feature/change-button-color
 ├── idea/add-new-card
 ├── mission/level-1-first-pr
 ├── fix/typo-in-glossary
 └── conflict/title-collision
```

## Hauptbranch

### `main`
- Immer stabil und deploybar
- GitHub Pages deployt von hier
- Kein direkter Push erlaubt (nach Setup)
- Änderungen nur über Pull Requests

## Feature-Branches

Für jede Aufgabe ein eigener Branch. Der Branch lebt nur so lange, bis der PR gemerged ist.

### Namensschema

| Prefix | Wann verwenden | Beispiel |
|--------|---------------|----------|
| `feature/` | Neues Feature oder UI-Änderung | `feature/change-button-color` |
| `fix/` | Bugfix oder Korrektur | `fix/typo-in-readme` |
| `idea/` | Neue Idee hinzufügen | `idea/add-ai-automation-card` |
| `mission/` | Mission bearbeiten | `mission/level-1-first-pr` |
| `conflict/` | Konflikt-Übung | `conflict/navbar-title-collision` |

### Regeln für Branch-Namen
- Nur Kleinbuchstaben
- Wörter mit Bindestrich trennen
- Kurz und beschreibend
- Kein Leerzeichen, keine Sonderzeichen

## Lebenszyklus eines Branches

```
1. Branch erstellen     → git checkout -b feature/mein-thema
2. Arbeiten + committen → git add . && git commit -m "..."
3. Pushen               → git push -u origin feature/mein-thema
4. PR erstellen         → auf GitHub
5. Review bekommen      → von der anderen Person
6. Feedback einarbeiten → falls nötig
7. Merge                → nach Approve
8. Branch löschen       → automatisch oder manuell
```

## Wann erstelle ich einen neuen Branch?

- Bevor du irgendetwas änderst
- Für jede einzelne Aufgabe oder Mission
- Auch für kleine Änderungen (ein Tippfehler = ein Branch)

## Was passiert bei Konflikten?

Wenn zwei Branches dieselbe Datei an derselben Stelle ändern, entsteht ein Konflikt beim Merge. Das ist normal und gewollt (besonders in Level 4 Missionen).

Siehe: [Conflict Lab](conflict-lab.md)
