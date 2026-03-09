# Git & GitHub Glossar

Kurze, alltagstaugliche Erklärungen der wichtigsten Begriffe.

## Repository (Repo)

Ein Ordner mit allen Dateien deines Projekts — plus die komplette Änderungshistorie. GitHub speichert eine Kopie online.

## Clone

Eine lokale Kopie eines GitHub-Repos auf deinem Computer erstellen.

```bash
git clone https://github.com/user/repo.git
```

## Commit

Ein gespeicherter Zwischenstand deiner Änderungen. Wie ein Speicherpunkt in einem Spiel.

```bash
git add datei.txt
git commit -m "Button-Farbe auf grün geändert"
```

## Push

Deine lokalen Commits zu GitHub hochladen. Erst nach dem Push sieht die andere Person deine Änderungen.

```bash
git push
```

## Pull

Die neuesten Änderungen von GitHub auf deinen Computer holen.

```bash
git pull
```

## Branch

Ein separater Arbeitszweig. Du arbeitest auf deinem Branch, ohne `main` zu verändern. Wenn alles fertig ist, werden die Änderungen zusammengeführt.

```bash
git checkout -b feature/neuer-button
```

## Main

Der Hauptbranch. Hier liegt immer die stabile, funktionierende Version. Niemand arbeitet direkt auf `main`.

## Pull Request (PR)

Eine Anfrage auf GitHub: „Bitte schau dir meine Änderungen an und übernimm sie in `main`." Der PR zeigt genau, was geändert wurde.

## Review

Die Prüfung eines Pull Requests durch eine andere Person. Der Reviewer kann:
- **Approve** — alles gut, kann gemerged werden
- **Request Changes** — bitte noch etwas ändern
- **Comment** — Frage oder Hinweis ohne Bewertung

## Merge

Das Zusammenführen eines Branches mit `main`. Passiert nach einem erfolgreichen Review.

## Konflikt (Merge Conflict)

Entsteht, wenn zwei Personen dieselbe Stelle in einer Datei unterschiedlich geändert haben. Git kann nicht automatisch entscheiden, welche Version richtig ist — du entscheidest.

## Diff

Die Ansicht der Unterschiede zwischen zwei Versionen einer Datei. Zeigt was hinzugefügt (grün) und was entfernt (rot) wurde.

## Stage / Staging Area

Der Bereich, in dem du Dateien sammelst, bevor du einen Commit machst. Mit `git add` fügst du Dateien zur Staging Area hinzu.

## Remote

Die Online-Version deines Repos auf GitHub. Dein lokaler Ordner ist die „lokale" Kopie, GitHub ist das „Remote".

## Fork

Eine eigene Kopie eines fremden Repos auf deinem GitHub-Account. Für dieses Projekt nicht relevant, aber gut zu wissen.

## Issue

Ein Ticket auf GitHub für Ideen, Probleme oder Aufgaben. Wir nutzen Issues für neue Ideen und Missionen.
