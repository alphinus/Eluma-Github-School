# Missionsübersicht

Alle Missionen im Überblick, sortiert nach Level.

## Level 1 — Die ersten sicheren Schritte

Ziel: Routine aufbauen — Datei ändern, committen, pushen, Ergebnis sehen.

| Mission | Titel | Schwierigkeit | Voraussetzung |
|---------|-------|---------------|---------------|
| L1-M1 | Button-Farbe ändern | einfach | — |
| L1-M2 | Überschrift der Startseite anpassen | einfach | L1-M1 |
| L1-M3 | Eine neue Ideen-Karte hinzufügen | einfach | L1-M1 |
| L1-M4 | GitHub Mobile App einrichten | einfach | — |
| L1-M5 | README-Korrektur einreichen | einfach | L1-M2 |

## Level 2 — Lokal vs. Remote verstehen

Ziel: Verstehen, dass lokale Dateien und GitHub-Stand nicht automatisch identisch sind.

| Mission | Titel | Schwierigkeit | Voraussetzung |
|---------|-------|---------------|---------------|
| L2-M1 | Lokal ändern, aber noch nicht pushen | mittel | L1-M1, L1-M2 |
| L2-M2 | Branch pushen und im Browser prüfen | mittel | L2-M1 |
| L2-M3 | Fremden Merge synchronisieren | mittel | L2-M2 |
| L2-M4 | PR nach Feedback ergänzen | mittel | L2-M2 |

## Level 3 — Branches bewusst nutzen

Ziel: Verstehen, warum pro Aufgabe ein eigener Branch sinnvoll ist.

| Mission | Titel | Schwierigkeit | Voraussetzung |
|---------|-------|---------------|---------------|
| L3-M1 | Idee in eigenem Branch anlegen | mittel | L2-M2 |
| L3-M2 | UI-Anpassung im Feature-Branch | mittel | L3-M1 |
| L3-M3 | Dokumentationsfix im Fix-Branch | mittel | L3-M1 |

## Level 4 — Konflikte absichtlich erzeugen und lösen

Ziel: Konflikte entmystifizieren — sie sind kein Fehler, sondern eine Entscheidung.

| Mission | Titel | Schwierigkeit | Voraussetzung |
|---------|-------|---------------|---------------|
| L4-M1 | Überschriften-Konflikt | schwer | L3-M2 |
| L4-M2 | CSV-Konflikt lösen | schwer | L4-M1 |

## Level 5 — Reviews und Qualität

Ziel: PRs nicht nur abgeben, sondern lesen, prüfen und verbessern.

| Mission | Titel | Schwierigkeit | Voraussetzung |
|---------|-------|---------------|---------------|
| L5-M1 | PR-Beschreibung verbessern | schwer | L3-M2 |
| L5-M2 | Ersten Review-Kommentar schreiben | schwer | L5-M1 |
| L5-M3 | Request Changes einsetzen | schwer | L5-M2 |
| L5-M4 | PR nach Review-Feedback überarbeiten | schwer | L5-M3 |

## Abhängigkeits-Baum

```
L1-M1 ──┬── L1-M2 ──── L1-M5
         │
         └── L1-M3

L1-M4 (unabhängig)

L1-M1 + L1-M2 ──── L2-M1 ──── L2-M2 ──┬── L2-M3
                                         ├── L2-M4
                                         └── L3-M1 ──┬── L3-M2 ──┬── L4-M1 ── L4-M2
                                                      │           └── L5-M1 ── L5-M2 ── L5-M3 ── L5-M4
                                                      └── L3-M3
```
