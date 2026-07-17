# Praxis-Startseite

Browser-Dashboard fuer Arztpraxen — gedacht als Startseite auf allen Praxis-PCs. Praxisname, Links, Kacheln und alle Inhalte lassen sich im Admin-Bereich anpassen.

![Dashboard](public/assets/praxisstartseite.jpeg)

## Features

**Schnelllinks** — Haeufig genutzte Seiten (KVB Portal, Laborportal, Krankenkassen, Verbaende) in aufklappbaren Kategorien.

**Programmkacheln** — Alle Praxis-Tools als grosse, uebersichtliche Kacheln in der Mitte. Ein Klick oeffnet die Anwendung.

**Stimmungsbarometer** — MFAs koennen per Smiley (rot/gelb/gruen) ihre Stimmung erfassen, optional mit Kommentar. Inklusive Kalenderansicht mit Monatsstatistik und Tagesdetails.

**Kanban-Board** — Aufgaben im Team organisieren mit Drag & Drop zwischen den Spalten (Idee, Geplant, In Umsetzung, Erledigt). Inline-Editing und Optimistic Locking fuer paralleles Arbeiten.

**Flachwitze** — Zeigt oben auf der Startseite mehrere zufaellige Witze, die in einem einstellbaren Intervall automatisch wechseln — ideal zur Ablenkung, z.B. beim Impfen. Per Button lassen sich jederzeit sofort frische Witze anzeigen. Witze und Rotationseinstellungen (Intervall, Anzahl) werden im Admin-Bereich verwaltet.

**Urlaubs-Countdown** — Zeigt an, wie viele Tage bis zum naechsten Urlaub verbleiben oder ob gerade Urlaub ist.

**Geburtstage** — Die naechsten drei Geburtstage im Team auf einen Blick, mit Altersangabe.

**Vertretungen** — Kommende Vertretungsregelungen mit Datum, Kollegenname und Kontaktinfos.

**Dark Mode** — Umschaltbar per Klick im Header.

## Technik

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML/CSS/JS (kein Framework)
- **Daten:** JSON-Dateien mit automatischem Backup-System
- **Admin:** Passwortgeschuetzter Admin-Bereich zum Verwalten aller Inhalte (Standard-Passwort siehe unten)

## Live-Demo (GitHub Pages)

Im Ordner `docs/` liegt eine statische Demo mit Beispieldaten, die ohne Server direkt im Browser laeuft:

**https://lollylan.github.io/PraxisStartseite/**

Aktivieren unter GitHub → Settings → Pages → "Deploy from a branch" → Branch `main`, Ordner `/docs`.

Die Demo nutzt die echten Frontend-Dateien aus `public/`, ersetzt aber die Server-API durch einen `fetch`-Mock mit Beispieldaten (Termine, Vertretungen und Stimmungen werden relativ zum aktuellen Datum erzeugt, damit die Demo aktuell bleibt). Stimmungsabgabe und Kanban-Board sind interaktiv, Aenderungen leben nur im Browser. Der Admin-Bereich ist nicht Teil der Demo.

Nach Aenderungen am Frontend die Demo neu bauen:

```bash
npm run build:demo
```

## Installation

```bash
npm install
npm start
```

Die Startseite ist dann erreichbar unter `http://localhost:7847`, der Admin-Bereich unter `http://localhost:7847/admin.html`.

## Admin-Bereich & Passwort

Der Admin-Bereich ist beim ersten Start mit dem **Standard-Passwort `admin`** gesichert.

> ⚠️ **Wichtig:** Dieses Passwort ist nur fuer die Erstinbetriebnahme gedacht und muss nach der ersten Nutzung unbedingt geaendert werden. Das Aendern geht direkt im Admin-Bereich unter **Einstellungen → Passwort aendern**. Solange noch das Standard-Passwort aktiv ist, erscheint beim Login eine entsprechende Warnung.

## Lizenz

MIT
