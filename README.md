# Eluma GitHub School

Ein gemeinsames Lern-, Kollaborations- und Ideen-Repository für zwei Personen. GitHub wird hier nicht theoretisch erklärt, sondern durch echte Workflows praktisch gelernt.

## Für wen ist das?

- **Elvis** (Schüler): Lernt GitHub Schritt für Schritt durch Missionen
- **Mario** (Mentor): Strukturiert das System, reviewed PRs, pflegt Ideen

## Wie funktioniert es?

### Missionssystem
Das Repo enthält Missionen in 5 Levels:

| Level | Thema | Beispiel |
|-------|-------|----------|
| 1 | Erste Schritte | Button-Farbe ändern, erster PR |
| 2 | Lokal vs. Remote | Push/Pull verstehen |
| 3 | Branches nutzen | Feature-Branches, Branch-Namensregeln |
| 4 | Konflikte lösen | Absichtliche Merge-Konflikte |
| 5 | Reviews & Qualität | PRs prüfen, Feedback geben |

Jede Mission hat eine Story, ein Ziel und ein sichtbares Ergebnis.

### Ideenlabor
Ideen, Probleme und Konzepte werden strukturiert gesammelt und als Karten in der Web-App angezeigt.

### Playground
Ein Bereich in der App, in dem Codeänderungen sofort sichtbar werden — ideal für erste Übungen.

## Zusammenarbeit

- **Keine direkte Arbeit auf `main`** — immer auf einem Branch arbeiten
- **Jede Änderung braucht einen Pull Request**
- **Jeder PR braucht ein Review** durch die andere Person
- Branch-Namensschema: `feature/`, `fix/`, `idea/`, `mission/`

Details: [CONTRIBUTING.md](CONTRIBUTING.md) · [Team-Regeln](docs/team-rules.md) · [Branch-Strategie](docs/branch-strategy.md)

## App lokal starten

```bash
# Repo klonen
git clone https://github.com/alphinus/Eluma-Github-School.git
cd Eluma-Github-School

# index.html im Browser öffnen — fertig!
```

Kein Build-Tool nötig. Einfach `index.html` öffnen.

## Eine Idee einreichen

**Weg A:** [Neues Issue erstellen](https://github.com/alphinus/Eluma-Github-School/issues/new/choose) mit dem Ideen-Template

**Weg B:** Neue Zeile in `data/ideas/ideas_merged.csv` ergänzen (per Branch + PR)

## Erste Mission starten

1. Lies den [Lernpfad](docs/learning-path.md)
2. Starte mit Level 1 in der [Missionsübersicht](docs/mission-map.md)
3. Folge den Schritten in der Mission
4. Erstelle deinen ersten Pull Request

## Glossar

Wichtige Begriffe wie **Commit**, **Branch**, **Pull Request** und **Merge** werden im [Glossar](docs/glossary.md) einfach erklärt.

## Projektstruktur

```
Eluma-Github-School/
├── index.html          ← Web-App Einstieg
├── styles.css          ← Styling
├── app.js              ← App-Logik
├── docs/               ← Lernpfad, Glossar, Regeln
├── data/               ← Ideen (CSV), Missionen (JSON)
├── sandbox/            ← Playground-Experimente
├── .github/            ← PR- und Issue-Templates
└── assets/             ← Bilder und Medien
```

## Links

- [Lernpfad](docs/learning-path.md)
- [Glossar](docs/glossary.md)
- [Missionsübersicht](docs/mission-map.md)
- [Team-Regeln](docs/team-rules.md)
- [Branch-Strategie](docs/branch-strategy.md)
- [CONTRIBUTING](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
