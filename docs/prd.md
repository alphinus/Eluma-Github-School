# PRD — GitHub Playground & Ideenlabor für 2 Personen

## 1. Dokumentstatus

- **Projektname:** Eluma GitHub School
- **Repository:** `Eluma-Github-School`
- **Zweck:** Dauerhaftes gemeinsames Lern-, Kollaborations- und Ideen-Repository für zwei Personen
- **Format:** Öffentliches GitHub-Repository mit kleiner Web-App, strukturierten Inhalten und bewusst designten GitHub-Workflows
- **Primäre Nutzer:**
  - **Mario** (Mentor): Initiator, bereits sicherer im Gesamtverständnis, strukturiert das System und reviewed PRs
  - **Elvis** (Schüler): fortgeschrittener Anfänger, ca. 2 Monate Terminal-/Codex-/Claude-Code-Erfahrung, kennt Commit/Push in Grundzügen
- **Kadenz:** Tägliche Zusammenarbeit
- **Langfristige Rolle des Repos:**
  1. **Lernumgebung** für Git/GitHub
  2. **Spielerischer Playground** mit Missionen und Challenges
  3. **Dauerhaftes Ideenlabor** für Projekte, Probleme, Konzepte und Diskussionen
  4. **Öffentliche Demo** für andere, sobald das Modell stabil ist

---

## 2. Ausgangslage

Es besteht der Bedarf, einem technisch noch unsicheren Mitwirkenden GitHub **nicht theoretisch**, sondern **praktisch, visuell und wiederholbar** beizubringen. Reine Erklärungen reichen nicht aus. Benötigt wird eine Struktur, in der GitHub selbst Teil des Spiels ist.

Gleichzeitig soll die Repository-Struktur nicht nur ein Lernobjekt sein, sondern einen echten Nutzen behalten: Sie soll dauerhaft einen **zuverlässigen, klar strukturierten Ideenaustausch** zwischen zwei Personen ermöglichen.

Der Nutzer soll dadurch lernen:

- warum `main` stabil bleibt
- warum Änderungen nicht direkt auf `main` passieren
- was Branches konkret bedeuten
- wann Commit, Push, Pull Request, Review und Merge stattfinden
- wie Konflikte entstehen
- wie GitHub-Benachrichtigungen und Teamabläufe funktionieren

Die Lernumgebung soll bewusst **einfach, robust und kindgerecht verständlich** sein. Die technische Komplexität muss niedrig genug bleiben, damit ein fast kindlicher Einstieg möglich ist, ohne dass das System banal wird.

---

## 3. Produktvision

Wir bauen ein öffentliches GitHub-Repository, das sich wie eine Mischung aus **Lernspiel, Ideen-Werkstatt und Mini-Web-App** verhält.

Das Repository besitzt drei Schichten:

### 3.1 Lernschicht
GitHub wird über echte Abläufe gelernt:

- Branch anlegen
- Änderungen machen
- Commit schreiben
- Push ausführen
- Pull Request öffnen
- Review erhalten oder geben
- Änderungen nach Review anpassen
- Konflikte absichtlich provozieren und lösen
- Merge durchführen

### 3.2 Sichtbare Playground-Schicht
Eine kleine Web-App macht Änderungen direkt sichtbar, z. B.:

- Button-Farbe ändern
- Karte hinzufügen
- Statusbadge anpassen
- Missionsstatus verändern
- Idee erstellen oder Kategorie sichtbar machen

So ist jeder Git-Schritt an ein **sichtbares Ergebnis** geknüpft.

### 3.3 Dauerhafte Ideenlabor-Schicht
Das Repo bleibt nach der Lernphase aktiv und dient weiterhin als:

- Ideenablage
- Problemboard
- Diskussionsstruktur
- Feature-Pool
- Projekt-Vorstellungsraum

Damit wird vermieden, dass das System nach der Lernphase wertlos wird.

---

## 4. Ziele

## 4.1 Hauptziele

1. Einsteigerfreundliches, dauerhaftes GitHub-Trainingssystem für zwei Personen schaffen.
2. GitHub-Workflows nicht nur erklären, sondern erzwingen und sichtbar machen.
3. Einen belastbaren Raum für Ideenaustausch schaffen.
4. Den zweiten Nutzer schrittweise von Alltagssicherheit bis zu Reviews und Konfliktlösung führen.
5. Eine öffentliche Repo-Struktur schaffen, die später auch anderen als Beispiel dienen kann.

## 4.2 Lernziele nach Levels

### Level 1 — GitHub im Alltag bedienen
Der Nutzer soll verstehen und anwenden können:

- Repository öffnen
- Dateien ändern
- Commit erstellen
- Push ausführen
- einfache GitHub-Oberfläche lesen
- erkennen, dass Änderungen versioniert sind

### Level 2 — Lokal vs. Remote sauber verstehen
Der Nutzer soll unterscheiden können:

- lokale Änderungen vs. GitHub-Stand
- was ein Push bewirkt
- was ein Pull bzw. Sync bewirkt
- warum GitHub nicht „automatisch alles weiss“

### Level 3 — Branching-Strategien anwenden
Der Nutzer soll verstehen:

- warum `main` stabil bleibt
- warum auf Feature-Branches gearbeitet wird
- wann ein Branch erstellt wird
- wann ein Branch gelöscht werden kann

### Level 4 — Merge-Konflikte lösen
Der Nutzer soll erleben und beherrschen:

- wie Konflikte entstehen
- wie Konflikte angezeigt werden
- wie man sie lokal oder auf GitHub löst
- wie man Konflikte fachlich bewertet statt blind zu klicken

### Level 5 — Reviews schreiben und Pull Requests beurteilen
Der Nutzer soll können:

- PRs lesen
- Änderungen nachvollziehen
- Review-Kommentare geben
- kleine Verbesserungen anfordern
- Merge nur bei sauberem Zustand freigeben

---

## 5. Nicht-Ziele

Folgendes ist **nicht** Ziel der ersten Version:

- komplexe Unternehmensrollen oder Organisationen auf GitHub
- CI/CD mit hoher Komplexität
- Docker-/Kubernetes-Setups
- schwere Datenbanken oder Backend-Infrastruktur
- Authentifizierungssysteme für die App
- Echtzeit-Kollaboration wie Figma oder Google Docs
- vollautomatische GitHub-Erklärung per KI innerhalb der App

Der Fokus liegt auf **klaren GitHub-Prozessen**, **niedriger Einstiegshürde** und **dauerhaftem Nutzen**.

---

## 6. Zielgruppe und Nutzerprofile

## 6.1 Elvis (Schüler / Lernnutzer)

Eigenschaften:

- kann Terminal öffnen
- kann Befehle eingeben
- hat bereits mit Claude Code / Codex gearbeitet
- hat eine kleine App gebaut
- ist kein kompletter Anfänger
- kennt Commit und Push erst seit kurzem
- kennt Pull Requests, Reviews und Konfliktlösung noch nicht praktisch
- E-Mail: eluma0002@gmail.com

Bedarf:

- sehr klare Struktur
- sehr kleine Einzelschritte
- sichtbare Belohnung
- echte Wiederholung
- keine Setup-Hölle

## 6.2 Mario (Mentor / Co-Builder)

Eigenschaften:

- strukturiert das System
- reviewed PRs
- pflegt Regeln
- liefert Beispiel-Änderungen
- nutzt das Repo gleichzeitig produktiv als Ideenpool

---

## 7. Produktprinzipien

1. **Spielerisch, aber echt**  
   Nichts wird nur simuliert, wenn es auch real durch GitHub gelernt werden kann.

2. **Einfacher Einstieg**  
   Jede Mission muss so klar sein, dass sie fast ein Zehnjähriger ausführen könnte.

3. **Sichtbare Konsequenz**  
   Jede Git-Aktion soll einen sichtbaren Effekt haben: in Code, UI, PR oder Review.

4. **Dauerhafter Nutzen**  
   Das Repo bleibt nach dem Training als Ideenlabor bestehen.

5. **Öffentlichkeitsfähigkeit**  
   Struktur, Benennung und Dokumentation sollen so sauber sein, dass später andere davon lernen können.

6. **GitHub-first**  
   Benachrichtigungen, Pull Requests, Reviews und Issues sollen bewusst über offizielle GitHub-Kanäle erlebbar sein.

---

## 8. Produktform

Das Produkt besteht aus folgenden Bausteinen:

### 8.1 Öffentliches GitHub-Repository
Enthält:

- Web-App
- Ideen-Daten
- Missions-Dokumentation
- Lernpfad
- Contribution-Regeln
- PR-Templates
- Issue-Templates
- Beispiel-Challenges

### 8.2 Kleine Web-App
Ziel:

- Inhalte sichtbar machen
- kleine Änderungen schnell testbar machen
- Ideen und Kategorien visualisieren
- Missionsfortschritt erlebbar machen

### 8.3 Strukturierter Ideenbereich
Ziel:

- bestehende CSV-Daten integrieren
- neue Ideen einfach ergänzen
- Kategorien, Besitzer, Status und Kontext abbilden

### 8.4 Missionssystem
Ziel:

- GitHub-Schritte als Aufgaben inszenieren
- Fortschritt stufenweise erhöhen
- echte Branch-/PR-/Review-Abläufe trainieren

### 8.5 GitHub-Benachrichtigungsintegration
Ziel:

- offizielle PR- und Review-Notifications bewusst nutzen
- Lernnutzer an GitHub-Mobile-App und Notification-Verhalten gewöhnen

---

## 9. Kernproblem, das gelöst wird

Viele Menschen lernen GitHub fragmentiert:

- einzelne Befehle ohne Kontext
- Commits ohne Branch-Verständnis
- Pushes ohne Remote-Konzept
- PRs nur als fremdes UI-Element
- Konflikte erst, wenn es schiefgeht

Das führt zu mechanischem Handeln statt Verständnis.

Dieses Produkt löst das Problem durch eine **einzige kohärente Umgebung**, in der:

- GitHub-Abläufe bewusst gestaltet sind
- jede Aktion sichtbar ist
- Fehler ausdrücklich Teil des Lernens sind
- der Output zugleich für echte Zusammenarbeit nützlich bleibt

---

## 10. Informationsarchitektur

## 10.1 Empfohlene Repository-Struktur

```text
Eluma-Github-School/
├─ index.html              ← App-Einstieg (Root für GitHub Pages)
├─ styles.css
├─ app.js
├─ README.md
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md      ← Contributor Covenant
├─ LICENSE                  ← MIT
├─ .gitignore
├─ .github/
│  ├─ pull_request_template.md
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ idea.yml
│  │  ├─ mission.yml
│  │  ├─ problem.yml
│  │  └─ review-request.yml
│  └─ workflows/
│     └─ validate-data.yml
├─ docs/
│  ├─ prd.md
│  ├─ learning-path.md
│  ├─ team-rules.md
│  ├─ glossary.md
│  ├─ mission-map.md
│  ├─ branch-strategy.md
│  └─ conflict-lab.md
├─ data/
│  ├─ ideas/
│  │  ├─ ideas_mario.csv
│  │  ├─ ideas_elvis.csv
│  │  └─ ideas_merged.csv
│  ├─ missions/
│  │  └─ missions.json
│  └─ config/
│     └─ categories.json
├─ assets/
├─ sandbox/
│  ├─ ui-playground/
│  ├─ color-lab/
│  └─ component-lab/
└─ archive/
   └─ completed-missions/
```

### Deployment-Entscheidung
- **GitHub Pages** deployt direkt vom `main`-Branch, Root-Verzeichnis (`/`)
- `index.html`, `styles.css` und `app.js` liegen im Root — kein Unterordner nötig
- Nach jedem Merge auf `main` wird die Live-Seite automatisch aktualisiert
- Das ist der einfachste und real-world-konformste Ansatz für statische Seiten

---

## 11. Empfohlener Technologierahmen

## 11.1 Empfehlung für Version 1

**Stack:** HTML + CSS + Vanilla JavaScript

### Begründung
- minimaler Setup-Aufwand
- sehr leicht verständlich
- lokal direkt öffnbar
- später leicht auf Vite/React migrierbar
- ideal für Lernfokus statt Tool-Komplexität

## 11.2 Option für Version 2

**Stack:** Vite + Vanilla JS oder Vite + React

Nur dann sinnvoll, wenn:
- der Nutzer im Alltag mit modernen Frontend-Tools arbeiten soll
- der Lernfokus später Richtung Komponenten, State und Build-Prozesse erweitert wird

## 11.3 Deployment

**GitHub Pages** — Deploy vom `main`-Branch, Root-Verzeichnis (`/`)

- `index.html`, `styles.css`, `app.js` liegen im Root-Verzeichnis (kein `/app`-Unterordner)
- Nach jedem Merge auf `main` wird die Live-Seite automatisch aktualisiert
- Direkt an GitHub geknüpft — sichtbare Live-Auswirkung nach Merges
- Ideal für Lern- und Demo-Zweck

---

## 12. Hauptfunktionen

## 12.1 Funktion A — Ideenlabor

### Beschreibung
Zentraler Bereich zur Ablage, Anzeige und Pflege von Ideen, Problemen, Konzepten und Projektansätzen.

### Anforderungen
- Ideen aus zwei CSV-Quellen importierbar
- Ideen nach Kategorien darstellbar
- klar sichtbar, wem eine Idee gehört
- neue Ideen strukturiert erfassbar
- Statusverwaltung möglich
- später Zusammenführung in gemeinsame Sicht

### Minimales Datenmodell je Idee
- `id`
- `title`
- `owner`
- `category`
- `summary`
- `problem`
- `potential`
- `next_step`
- `status`
- `created_at`
- `updated_at`

### Beispiel-Statuswerte
- `raw`
- `discussing`
- `validated`
- `parked`
- `building`

### Beispiel-Kategorien
- App-Idee
- Automatisierung
- KI-Workflow
- Geschäftsmodell
- Content
- Problem
- Experiment
- Offene Frage

---

## 12.2 Funktion B — Missionssystem

### Beschreibung
Missions und Challenges lehren GitHub-Schritte über kleine konkrete Aufgaben.

### Anforderungen
- Missionen in Levels gruppiert
- jede Mission hat Ziel, Schritte, erwartetes Ergebnis und GitHub-Lerneffekt
- Missionen sollen real durch Branches, Commits und PRs gelöst werden
- Missionen sollen teilweise absichtlich Konflikte auslösen

### Beispiel-Missionsattribute
- `mission_id`
- `level`
- `title`
- `story`
- `objective`
- `files_to_edit`
- `branch_name_example`
- `acceptance_criteria`
- `github_skill`
- `difficulty`

---

## 12.3 Funktion C — Visueller Playground

### Beschreibung
Bereich der Web-App, in dem einfache Änderungen schnell sichtbar werden.

### Beispiele
- Theme-Farbe wechseln
- Button-Text ändern
- neue Idee-Karte anzeigen
- Statusbadge ändern
- Komponente verschieben
- Kategorie-Farbe anpassen

### Nutzen
- direkter Zusammenhang zwischen Codeänderung und Ergebnis
- ideal für erste Branch-/PR-Übungen
- motivierender als reine Textdatei-Änderungen

---

## 12.4 Funktion D — GitHub-Realismus

### Beschreibung
Die Nutzer sollen möglichst viel über echte GitHub-Abläufe lernen, nicht über abstrahierte Simulation.

### Anforderungen
- PRs nur über GitHub
- Reviews nur über GitHub-Kommentare/Approve/Request Changes
- Issues für Ideen, Probleme und Missionen
- Mobile-App-Nutzung als explizite Lernmission
- Notification-Verhalten bewusst erleben

---

## 13. Teamregeln

Diese Regeln sind absichtlich realitätsnah, aber für zwei Personen vereinfacht.

## 13.1 Branch-Regeln

### Hauptbranches
- `main` = immer stabil, präsentierbar, deploybar
- optional später: `stage` oder `develop` = Sammelbereich für getestete Änderungen vor `main`

### Empfehlung für Startphase
Für die erste stabile Lernphase genügt:
- `main`
- Feature-Branches pro Aufgabe

### Branch-Namensschema
```text
feature/<kurze-beschreibung>
fix/<kurze-beschreibung>
idea/<kurze-beschreibung>
mission/<level>-<name>
conflict/<scenario-name>
```

Beispiele:
```text
feature/change-button-color
idea/add-ai-automation-card
mission/level-1-first-pr
conflict/navbar-title-vs-header-title
```

## 13.2 Änderungsregeln
- Keine direkte Arbeit auf `main`
- Jede inhaltliche Änderung erfolgt in einem Branch
- Jede abgeschlossene Änderung braucht einen Pull Request
- Jede Änderung braucht Review durch die zweite Person
- PR darf erst gemerged werden, wenn beide verstanden haben, was geändert wurde

## 13.3 Merge-Regeln
- kleine, verständliche PRs bevorzugen
- kein großer Sammel-PR mit 30 Änderungen
- Branch nach erfolgreichem Merge löschen
- Merge-Konflikte nicht blind lösen; die inhaltlich richtige Version wird bewusst gewählt

## 13.4 Kommunikationsregeln
- PR-Beschreibung erklärt immer: **Was**, **Warum**, **Wie testen**
- Review-Kommentare sachlich und konkret
- Unklare Änderungen lieber in kleinere PRs aufteilen

---

## 14. Lernmechanik als Spiel

## 14.1 Spielprinzip
Jede GitHub-Aktion ist Teil einer Mission. Die Mission hat:

- eine Story
- ein technisches Ziel
- ein sichtbares Ergebnis
- eine GitHub-Lektion

Beispiel:

> Mission: „Der blaue Button soll grün werden, aber nicht direkt auf `main`. Erstelle einen Branch, ändere die Farbe, committe sauber, pushe den Branch und öffne einen PR.“

Damit wird nicht nur die Farbe geändert, sondern der komplette Workflow gelernt.

## 14.2 Missionstypen

### Typ 1 — Sichtbare UI-Missionen
- Farbe ändern
- Text austauschen
- Badge hinzufügen
- Karte einblenden

### Typ 2 — Struktur-Missionen
- neue Idee als CSV-Zeile ergänzen
- Kategorie erweitern
- Dokumentation aktualisieren

### Typ 3 — GitHub-Missionen
- erster Pull Request
- Review anfordern
- Review-Kommentar beantworten
- Branch löschen

### Typ 4 — Konflikt-Missionen
- beide ändern dieselbe Zeile
- Title-Änderung kollidiert
- CSV-Konflikt lösen

### Typ 5 — Team-Missionen
- fremden PR reviewen
- Verbesserung anfordern
- Änderungswunsch einpflegen
- final approven

---

## 15. Vorgeschlagene Mission-Levels

> **Hinweis:** Die genaue Reihenfolge und Abhängigkeitskette der Missionen innerhalb jedes Levels wird bei der Implementierung durch Claude Code festgelegt. Die folgenden Missionen sind nach Level gruppiert, aber nicht zwingend in der dargestellten Reihenfolge zu absolvieren.

## Level 1 — Die ersten sicheren Schritte

### Ziel
Routine aufbauen: Datei ändern, committen, pushen, Ergebnis sehen.

### Beispiel-Missionen
1. Button-Farbe ändern
2. Überschrift der Startseite anpassen
3. Eine neue Ideen-Karte hinzufügen
4. Eine Beschreibung in README korrigieren
5. GitHub-Mobile-App installieren und Notifications aktivieren

### Erfolgsdefinition
Der Nutzer kann einen kleinen Branch anlegen und eine einfache Änderung per PR einreichen.

---

## Level 2 — Lokal vs. Remote verstehen

### Ziel
Verstehen, dass lokale Dateien und GitHub-Stand nicht automatisch identisch sind.

### Beispiel-Missionen
1. lokal Änderung machen, aber noch nicht pushen; Unterschied erklären
2. Branch pushen und im Browser prüfen
3. fremden Merge auf GitHub sehen und lokal synchronisieren
4. PR-Änderung nach Feedback nochmal ergänzen

### Erfolgsdefinition
Der Nutzer versteht den Unterschied zwischen lokaler Arbeitskopie, eigenem Branch und GitHub-Remote.

---

## Level 3 — Branches bewusst nutzen

### Ziel
Verstehen, warum pro Aufgabe ein eigener Branch sinnvoll ist.

### Beispiel-Missionen
1. neue Idee in eigenem `idea/`-Branch anlegen
2. UI-Anpassung in `feature/`-Branch vornehmen
3. Dokumentationsfix in `fix/`-Branch erledigen
4. Branch-Namen nach Regeln wählen

### Erfolgsdefinition
Der Nutzer arbeitet nicht mehr unspezifisch, sondern branch-orientiert.

---

## Level 4 — Konflikte absichtlich erzeugen und lösen

### Ziel
Konflikte entmystifizieren.

### Beispiel-Missionen
1. beide ändern dieselbe Überschrift
2. beide ändern denselben CSV-Eintrag
3. Konflikt lokal öffnen und manuell auflösen
4. dokumentieren, welche Version übernommen wurde und warum

### Erfolgsdefinition
Der Nutzer versteht, dass ein Konflikt kein Fehlerzustand, sondern ein Entscheidungszustand ist.

---

## Level 5 — Reviews und Qualität

### Ziel
PRs nicht nur abgeben, sondern lesen, prüfen und verbessern.

### Beispiel-Missionen
1. PR mit nichtssagender Beschreibung verbessern
2. Review-Kommentar schreiben
3. „Request changes“ richtig einsetzen
4. PR nach Feedback überarbeiten
5. Merge nur mit sauberem Review durchführen

### Erfolgsdefinition
Der Nutzer kann kleine PRs fachlich nachvollziehen und konstruktiv bewerten.

---

## 16. App-Konzept

## 16.1 Grundidee
Die App ist kein komplexes Produkt, sondern ein **visuelles Fenster** in die Lern- und Ideenstruktur.

## 16.2 Startseitenmodule

### Modul 1 — Willkommen / Lernstand
Zeigt:
- aktuelles Ziel
- nächste Mission
- letzte abgeschlossene Mission
- letzte gemergte Änderung

### Modul 2 — Ideenboard
Zeigt:
- Ideen als Karten
- Filter nach Besitzer, Kategorie, Status
- Kurzbeschreibung

### Modul 3 — Playground
Zeigt:
- bewusst einfache UI-Elemente
- Theme-Farbe
- Buttons
- Testkarten
- kleine Komponenten

### Modul 4 — GitHub-Wissen kompakt
Zeigt:
- Begriffe wie Commit, Push, PR, Review, Merge
- kurze alltagstaugliche Definitionen
- Links zu passenden Missionen

### Modul 5 — Aktive Missionen
Zeigt:
- offene Challenges
- Level-Zuordnung
- Ziel der Aufgabe

---

## 16.3 UI-Prinzipien
- sehr wenig technische Überladung
- klare Karten statt dichter Tabellen
- kindlich verständliche Sprache
- große erkennbare Veränderungen
- Farben und Status stark sichtbar
- mobile Darstellung mitdenken

---

## 17. Datenmodell für Ideen

## 17.1 Ausgangslage
Es existieren CSV-Dateien im eLuma-Standardformat mit folgenden 23 Spalten:

```csv
idea_id,session_uuid,created_at,created_by_email,project_name,problem_statement,target_user,solution_summary,constraints,differentiation,risks,next_action,status,priority,tags,source,version,image_url_1,image_url_2,image_url_3,image_url_4,image_url_5,audio_transcript
```

Nicht alle Felder sind in jeder CSV vollständig befüllt. Die Dateien stammen von beiden Nutzern und enthalten jeweils eigene Ideen.

## 17.2 Strategie
Version 1 soll beide Quellen zunächst **roh übernehmen**, dann in ein gemeinsames Normalformat bringen.

### Quellen
- `ideas_mario.csv` — Marios Ideen (Originale im eLuma-Format)
- `ideas_elvis.csv` — Elvis' Ideen (Originale im eLuma-Format)

### Ziel
- `ideas_merged.csv` als harmonisierte Sicht

## 17.3 Empfohlenes Normalformat

Das Normalformat wird aus dem eLuma-CSV-Format abgeleitet. Mapping:

| eLuma-Feld | Normalformat-Feld |
|---|---|
| `idea_id` | `id` |
| `created_by_email` | `owner` (→ "Mario" / "Elvis") |
| `project_name` | `title` |
| `tags` | `category` |
| `solution_summary` | `summary` |
| `problem_statement` | `problem` |
| `differentiation` | `potential` |
| `next_action` | `next_step` |
| `status` | `status` |
| `created_at` | `created_at` |
| *(neu)* | `updated_at` |

```csv
id,owner,title,category,summary,problem,potential,next_step,status,created_at,updated_at
```

## 17.4 Importlogik
- Originaldateien bleiben erhalten
- Normalisierte Datei wird daraus abgeleitet
- App arbeitet bevorzugt mit normalisierter Datei oder später JSON

## 17.5 Manuelle Ergänzung neuer Ideen
Neue Ideen sollen auf zwei Wegen möglich sein:

### Weg A — CSV direkt bearbeiten
Gut für Lernmissionen.

### Weg B — GitHub Issue über Template
Gut für schnelle Ideenerfassung unterwegs.

Empfehlung: Beide Wege unterstützen.

---

## 18. GitHub-Issue-Templates

Empfohlen werden vier Templates:

### 18.1 Idea Template
Für neue Ideen

Felder:
- Titel
- Kategorie
- Beschreibung
- Problem
- Nutzen
- Nächster Schritt
- Besitzer

### 18.2 Problem Template
Für Blocker oder offene Schwierigkeiten

Felder:
- Problem
- Kontext
- wo tritt es auf
- gewünschtes Ergebnis
- Vermutung

### 18.3 Mission Template
Für neue Lernmissionen

Felder:
- Level
- Missionstitel
- Ziel
- betroffene Dateien
- GitHub-Lerneffekt

### 18.4 Review Request Template
Für gezielte Bitte um Review

Felder:
- PR-Link
- worauf geachtet werden soll
- bekannte Unsicherheiten

---

## 19. Pull-Request-Template

Empfohlene Struktur:

```md
## Was wurde geändert?

## Warum wurde es geändert?

## Wie kann man es testen?

## Was soll beim Review besonders geprüft werden?

## Gehört diese Änderung zu einer Mission oder Idee?
```

Ziel:
- Kommunikationsqualität trainieren
- Reviewbarkeit erhöhen
- Verständnis fördern

---

## 20. GitHub-Mobile-App als Lernbaustein

Dies ist ein sinnvoller Bestandteil des Systems und sollte bewusst als Mission integriert werden.

## Mission-Vorschlag
**„Installiere GitHub auf deinem Android-Gerät und aktiviere Benachrichtigungen für Pull Requests und Reviews.“**

### Lernnutzen
- GitHub wird als aktives Kollaborationstool erlebt
- PRs und Reviews werden nicht nur im Browser wahrgenommen
- der Nutzer lernt, auf offizielle Kanäle zu achten

### Erfolgskriterium
- Nutzer erhält mindestens eine Push-Benachrichtigung zu einem echten PR oder Review

---

## 21. Begriffserklärungen für Anfänger

Diese Inhalte sollten zusätzlich in `docs/glossary.md` stehen und in der App kurz auftauchen.

### Commit
Ein gespeicherter Zwischenstand deiner Änderungen.

### Push
Der Moment, in dem dein lokaler Stand zu GitHub hochgeladen wird.

### Branch
Ein separater Arbeitszweig für eine Aufgabe, damit `main` sauber bleibt.

### Pull Request
Eine Bitte, deinen Branch mit einem anderen Branch zu vergleichen und zu übernehmen.

### Review
Die Prüfung deines Pull Requests durch die andere Person.

### Merge
Das Zusammenführen einer freigegebenen Änderung.

### Konflikt
Eine Stelle, an der Git nicht automatisch entscheiden kann, welche Änderung gelten soll.

---

## 22. User Stories

## 22.1 Lernnutzer
- Als Lernnutzer möchte ich kleine Aufgaben bekommen, damit ich GitHub Schritt für Schritt verstehe.
- Als Lernnutzer möchte ich sofort sehen, was meine Codeänderung bewirkt.
- Als Lernnutzer möchte ich Pull Requests in echter Umgebung üben.
- Als Lernnutzer möchte ich Konflikte in sicherem Rahmen erleben, bevor sie mich in echten Projekten blockieren.

## 22.2 Mitspieler / Reviewer
- Als Reviewer möchte ich kleine, klare PRs sehen, damit ich sinnvoll Feedback geben kann.
- Als Mitspieler möchte ich Ideen strukturiert ablegen, damit das Repo nach der Lernphase weiter nützlich bleibt.
- Als Mitspieler möchte ich Missionen definieren können, um gezielt Lernfortschritt zu steuern.

## 22.3 Beide gemeinsam
- Als Team möchten wir ein System, das Lernen und echten Ideenaustausch kombiniert.
- Als Team möchten wir GitHub-Benachrichtigungen bewusst erleben.
- Als Team möchten wir ein Repo, das wir später öffentlich zeigen können, ohne uns dafür schämen zu müssen.

---

## 23. Akzeptanzkriterien auf Produktebene

Das Produkt ist erfolgreich, wenn folgende Punkte erfüllt sind:

1. Zwei Personen können gemeinsam im selben Repo arbeiten, ohne direkt auf `main` zu committen.
2. Einsteiger können mindestens 5 einfache Missionen ohne Setup-Chaos ausführen.
3. Ideen aus zwei CSV-Quellen können sichtbar gemacht und strukturiert erweitert werden.
4. Pull Requests sind integraler Bestandteil des Alltags im Repo.
5. Mindestens ein absichtlich erzeugter Konflikt kann dokumentiert gelöst werden.
6. GitHub-Mobile-Notifications werden mindestens einmal produktiv genutzt.
7. Das Repo bleibt nach der Lernphase als Ideenlabor sinnvoll nutzbar.

---

## 24. Success Metrics

## 24.1 Lernmetriken
- Anzahl abgeschlossener Missionen pro Level
- Anzahl eigenständig erstellter Branches
- Anzahl sauber formulierter PRs
- Anzahl Reviews mit sinnvollem Kommentar
- Anzahl gelöster Konflikte

## 24.2 Kollaborationsmetriken
- Anzahl eingereichter Ideen
- Anzahl diskutierter Ideen
- Anzahl Issues pro Kategorie
- Anteil kleiner PRs statt großer Sammeländerungen

## 24.3 Nutzungsmetriken
- GitHub-Mobile-App eingerichtet: ja/nein
- GitHub Pages Live-Demo verfügbar: ja/nein
- App lokal startbar in unter 2 Minuten: ja/nein

---

## 25. Implementierungsphasen

## Phase 1 — Fundament
Ziel: Repo-Struktur und Regeln schaffen

Lieferobjekte:
- README
- CONTRIBUTING
- Teamregeln
- Branch-Strategie
- Glossar
- PR-Template
- Issue-Templates
- Grundstruktur der App

## Phase 2 — Sichtbarer Playground
Ziel: schnelle visuelle Erfolge ermöglichen

Lieferobjekte:
- Startseite
- Ideenkarten
- Filter-Grundgerüst
- einfache Style-Änderbarkeit
- erste Missionen Level 1

## Phase 3 — Ideenintegration
Ziel: CSV-Daten produktiv nutzbar machen

Lieferobjekte:
- zwei CSV-Dateien integrieren
- gemeinsames Normalformat definieren
- Anzeige in der App
- neue Ideen über CSV oder Issues ergänzen

## Phase 4 — Lernsystem ausbauen
Ziel: echte GitHub-Kompetenzen aufbauen

Lieferobjekte:
- Missionen Level 2 bis 5
- Konflikt-Lab
- Review-Mechanik
- Rollen- und Ritualdefinition

## Phase 5 — Öffentliche Demo-Reife
Ziel: Repo vorzeigbar machen

Lieferobjekte:
- saubere Dokumentation
- GitHub Pages Deployment
- Beispiel-Screenshots
- ggf. Demo-Daten

---

## 26. README-Struktur-Empfehlung

Die Startseite des Repos sollte ungefähr so aufgebaut sein:

1. Was ist dieses Repo?
2. Für wen ist es?
3. Wie funktioniert das Lernsystem?
4. Wie arbeitet man hier zusammen?
5. Was ist `main`, Branch, PR, Review?
6. Wie starte ich die App lokal?
7. Wie reiche ich eine Idee ein?
8. Welche Mission soll ich zuerst machen?

---

## 27. Konkrete Umsetzungsentscheidung

Für den Start wird folgende Architektur empfohlen:

### Technische Entscheidung
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Hosting:** GitHub Pages
- **Daten:** CSV als Quelle, optional später JSON für Anzeige
- **Zusammenarbeit:** GitHub Branches + PRs + Reviews
- **Lernsteuerung:** Markdown-Dokumente + Mission-Dateien + Issues

### Warum diese Entscheidung richtig ist
- maximal niedrigschwelliger Einstieg
- kein Build-Tool-Zwang in Version 1
- sehr gute Sichtbarkeit von Änderungen
- ideal für PR-basierte Kleinstaufgaben
- starke Passung zum Lernziel

---

## 28. Risiken und Gegenmaßnahmen

## Risiko 1 — Zu viel Komplexität am Anfang
**Problem:** Das Repo wird gleichzeitig Lernsystem, App und Ideenboard und dadurch zu schwer.

**Gegenmaßnahme:**
- nur eine sehr kleine erste App
- CSV zunächst simpel halten
- Missionen in sehr kleine Schritte brechen

## Risiko 2 — Spielmechanik wird kindlich statt nützlich
**Problem:** Es wirkt albern und verliert Langzeitwert.

**Gegenmaßnahme:**
- Missionen an echte Repo-Aufgaben koppeln
- kein künstliches Punkte-Feuerwerk als Hauptsache
- Nutzen des Ideenlabors immer priorisieren

## Risiko 3 — PR-Prozess wird umgangen
**Problem:** Aus Bequemlichkeit wird direkt auf `main` gearbeitet.

**Gegenmaßnahme:**
- klare Teamregeln
- Branch Protection später aktivieren
- PR als verpflichtender Ritualpunkt

## Risiko 4 — CSV wird unübersichtlich
**Problem:** Mit der Zeit leidet Datenqualität.

**Gegenmaßnahme:**
- Normalformat definieren
- Kategorien standardisieren
- neue Einträge über Templates lenken

## Risiko 5 — Konflikte wirken demotivierend
**Problem:** Lernnutzer empfindet Konflikte als Scheitern.

**Gegenmaßnahme:**
- Konflikte erst in geplanter Übung einführen
- Konflikte als Entscheidungsaufgabe formulieren
- kleine kontrollierte Szenarien verwenden

---

## 29. Spätere Ausbaustufen

Nicht für Version 1, aber sinnvoll als spätere Roadmap:

- GitHub Discussions aktivieren
- kleines JSON-Importskript aus CSV
- Statusfilter mit Suche
- Heatmap oder Timeline für Ideenaktivität
- automatische Datenvalidierung per GitHub Action
- Changelog-Seite mit letzten Merges
- Leaderboard für Missionen, falls gewünscht
- Migration auf Vite oder React

---

## 30. Konkreter Startplan für die erste Repo-Version

## Schritt 1
Repo öffentlich anlegen mit Grunddateien:
- README
- CONTRIBUTING
- LICENSE (MIT)
- CODE_OF_CONDUCT (Contributor Covenant)
- docs/
- data/
- .github/

## Schritt 2
Mini-App erstellen mit:
- Header
- Welcome-Karte
- Ideenkarten-Bereich
- Playground-Bereich mit 2–3 sichtbaren Elementen

## Schritt 3
Missionen Level 1 anlegen:
- Buttonfarbe ändern
- Titel ändern
- neue Ideenkarte hinzufügen
- GitHub-App installieren
- erster PR

## Schritt 4
PR-Template und Review-Routine aktiv nutzen.

## Schritt 5
CSV-Ideen importieren und normalisieren.

## Schritt 6
Konflikt-Lab als eigenes Szenario aufbauen.

---

## 31. Empfehlung zur Branch-Protection

Sobald das Repo stabil läuft, sollte GitHub so konfiguriert werden, dass:

- `main` vor direktem Push geschützt ist
- PR für Merge erforderlich ist
- mindestens 1 Review nötig ist
- gelöschte Branches nach Merge automatisch entfernt werden

Dies ist didaktisch wertvoll, weil die Regeln nicht nur beschrieben, sondern technisch durchgesetzt werden.

---

## 32. Definition of Done

Eine Aufgabe gilt als abgeschlossen, wenn:

1. sie in einem passenden Branch bearbeitet wurde
2. die Änderung nachvollziehbar commitet wurde
3. der Branch gepusht wurde
4. ein Pull Request erstellt wurde
5. die zweite Person reviewt hat
6. erforderliche Korrekturen eingepflegt wurden
7. der PR gemerged wurde
8. der Branch gelöscht wurde
9. die Änderung in App, Daten oder Dokumentation sichtbar ist

---

## 33. Empfohlene erste Deliverables für Claude Code / Codex

Der initiale Build-Agent soll idealerweise in einem ersten Durchlauf erzeugen:

1. Repo-Grundstruktur
2. README mit Projektidee und Schnellstart
3. CONTRIBUTING mit Branch-/PR-Regeln
4. `docs/team-rules.md`
5. `docs/glossary.md`
6. `docs/learning-path.md`
7. `docs/mission-map.md`
8. einfache Web-App im Root (`index.html`, `styles.css`, `app.js`)
9. Beispieldaten in `data/ideas/`
10. PR-Template und Issue-Templates

---

## 34. Endfazit

Das geplante Produkt ist **kein gewöhnliches Repo**, sondern ein **didaktisch designtes Kollaborationssystem**. Sein besonderer Wert liegt darin, dass Lernen und Nutzen nicht getrennt sind.

Der Nutzer lernt GitHub nicht durch trockene Theorie, sondern durch:
- reale Branches
- echte Pull Requests
- tatsächliche Reviews
- sichtbare UI-Änderungen
- kontrollierte Konflikte
- offizielle GitHub-Benachrichtigungen

Gleichzeitig bleibt das System langfristig wertvoll, weil es als **öffentlicher Ideenpool und Projektlabor** weiterverwendet wird.

Für die erste Version ist ein **einfaches, sauberes HTML/CSS/JS-Setup mit GitHub Pages** die richtige Entscheidung. Es hält die Hürde niedrig, erlaubt schnelle Lernerfolge und schafft eine robuste Grundlage für spätere Erweiterungen.

