# Konflikt-Lab

Anleitung für die Konflikt-Missionen in Level 4.

## Was ist ein Merge-Konflikt?

Ein Konflikt entsteht, wenn zwei Personen die **gleiche Stelle** in einer Datei auf **verschiedenen Branches** ändern. Git kann dann nicht automatisch entscheiden, welche Version gelten soll.

**Ein Konflikt ist kein Fehler.** Er ist eine Aufforderung: „Du musst entscheiden, was richtig ist."

## Wie sieht ein Konflikt aus?

Wenn du versuchst zu mergen und es einen Konflikt gibt, zeigt Git dir die betroffene Stelle so:

```
<<<<<<< HEAD
Deine Version der Zeile
=======
Die andere Version der Zeile
>>>>>>> branch-name
```

- Alles zwischen `<<<<<<< HEAD` und `=======` ist **deine Version**
- Alles zwischen `=======` und `>>>>>>> branch-name` ist **die andere Version**

## Wie löst man einen Konflikt?

### Schritt 1: Konflikt finden
Öffne die Datei mit dem Konflikt. Suche nach `<<<<<<<`.

### Schritt 2: Entscheiden
Wähle die richtige Version:
- **Deine behalten**: Lösche die andere Version und die Konflikt-Marker
- **Die andere behalten**: Lösche deine Version und die Konflikt-Marker
- **Beide kombinieren**: Schreibe eine neue Version, die beides vereint

### Schritt 3: Aufräumen
Entferne alle Konflikt-Marker (`<<<<<<<`, `=======`, `>>>>>>>`).

### Schritt 4: Committen
```bash
git add <datei>
git commit -m "Konflikt gelöst: <was wurde entschieden>"
```

## Übung: Überschriften-Konflikt (L4-M1)

### Vorbereitung
1. Mario erstellt Branch `conflict/header-mario` und ändert die Überschrift in index.html
2. Elvis erstellt Branch `conflict/header-elvis` und ändert die gleiche Überschrift
3. Mario merged seinen Branch zuerst
4. Elvis versucht seinen Branch zu mergen → Konflikt!

### Lösung
Elvis öffnet index.html, sieht den Konflikt und entscheidet mit Mario zusammen, welche Überschrift besser ist.

## Übung: CSV-Konflikt (L4-M2)

### Vorbereitung
1. Beide ändern den gleichen Eintrag in ideas_merged.csv
2. Einer merged zuerst
3. Der andere bekommt einen Konflikt

### Lösung
Schaut euch an, was der andere geändert hat. Entscheidet gemeinsam, welche Version (oder eine Kombination) sinnvoll ist.

## Tipps

- Konflikte sind **normal** und **kein Problem**
- Sprecht **vorher** ab, wer welche Dateien ändert (reduziert Konflikte)
- Kleine, fokussierte PRs haben **weniger Konflikte**
- Im Zweifel: **fragt die andere Person**, welche Version gelten soll
