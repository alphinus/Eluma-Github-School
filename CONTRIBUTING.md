# Mitarbeit an Eluma GitHub School

## Wie wir zusammenarbeiten

Dieses Repo gehört **Mario** (Mentor) und **Elvis** (Schüler). Wir arbeiten täglich zusammen und nutzen GitHub als echtes Kollaborationstool.

## Die goldene Regel

> **Niemals direkt auf `main` arbeiten.**

Jede Änderung — egal wie klein — läuft über einen Branch und einen Pull Request.

## Workflow: Schritt für Schritt

### 1. Branch erstellen

```bash
git checkout main
git pull
git checkout -b feature/mein-thema
```

### 2. Branch-Namen

| Typ | Schema | Beispiel |
|-----|--------|---------|
| Neues Feature | `feature/<beschreibung>` | `feature/change-button-color` |
| Bugfix | `fix/<beschreibung>` | `fix/typo-in-readme` |
| Neue Idee | `idea/<beschreibung>` | `idea/add-ai-automation-card` |
| Mission | `mission/<level>-<name>` | `mission/level-1-first-pr` |
| Konflikt-Übung | `conflict/<szenario>` | `conflict/title-collision` |

### 3. Änderungen machen und committen

```bash
git add datei.txt
git commit -m "Kurze Beschreibung was und warum"
```

Commit-Messages sollen erklären **was** geändert wurde und **warum**.

### 4. Branch pushen

```bash
git push -u origin feature/mein-thema
```

### 5. Pull Request erstellen

- Auf GitHub den PR öffnen
- Das PR-Template ausfüllen (Was, Warum, Wie testen)
- Die andere Person als Reviewer zuweisen

### 6. Review abwarten

- Reviewer liest den PR
- Gibt Feedback als Kommentar
- Nutzt „Approve" oder „Request Changes"

### 7. Feedback einarbeiten

Falls Änderungen gewünscht:

```bash
# Auf dem gleichen Branch weiterarbeiten
git add geaenderte-datei.txt
git commit -m "Review-Feedback eingearbeitet"
git push
```

### 8. Merge

- Erst nach Approve mergen
- Branch wird nach dem Merge gelöscht

## PR-Regeln

- **Kleine PRs** — lieber 3 kleine als 1 großen
- **Klare Beschreibung** — das Template hilft
- **Kein Merge ohne Review** — auch nicht bei Kleinigkeiten
- **Konflikte bewusst lösen** — nicht blind die eigene Version nehmen

## Ideen einreichen

Zwei Wege:

1. **CSV bearbeiten** → `data/ideas/ideas_mario.csv` oder `ideas_elvis.csv` bearbeiten, Branch + PR
2. **GitHub Issue** → „New Issue" → Idea-Template ausfüllen

## Missionen

Missionen findest du in der App und in `docs/mission-map.md`. Jede Mission sagt dir:
- welche Datei du ändern sollst
- welchen Branch-Namen du verwenden sollst
- was das Ziel ist
- welchen GitHub-Skill du dabei lernst
