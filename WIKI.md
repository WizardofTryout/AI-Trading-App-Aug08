# Willkommen im AI-Trading-App Wiki!

Dieses Dokument dient als zentrale Anlaufstelle für alle Informationen rund um dieses Projekt. Es soll Ihnen helfen, den aktuellen Stand zu verstehen, die Anwendung lokal zu testen und die zukünftige Entwicklung voranzutreiben.

## 1. Projektübersicht

Das Ziel dieses Projekts ist die Entwicklung einer eigenständigen Desktop-Anwendung für macOS, die es ermöglicht, den Handel an Kryptowährungsbörsen zu automatisieren. Benutzer können Handelsstrategien auf Basis von Pine-Script-Indikatoren erstellen, diese mit Hilfe von KI-Analyse verfeinern und den Handel in Echtzeit ausführen lassen, ohne den Markt ständig manuell beobachten zu müssen.

## 2. Aktueller Entwicklungsstand

Die Anwendung befindet sich in einem fortgeschrittenen Prototyp-Stadium. Die Benutzeroberfläche und die grundlegende Struktur sind implementiert, während die Kernlogik des Handelssystems (Backend) bisher nur als Mock (Simulation) existiert.

**Implementierte Features:**
*   **Grafische Benutzeroberfläche (UI):** Das Design orientiert sich stark an professionellen Trading-Plattformen wie TradingView und bietet einen Dark Mode.
*   **Multi-Pair-Dashboard:** Benutzer können mehrere Handelspaare auswählen und in separaten Tabs überwachen.
*   **Interaktive Chart-Ansicht:** Jeder Tab zeigt einen interaktiven Candlestick-Chart (basierend auf TradingView's Lightweight Charts) für das jeweilige Handelspaar an.
*   **Anpassbare Zeitfenster:** Für jeden Chart kann das Zeitfenster (z.B. 1m, 5m, 1h) individuell ausgewählt werden.
*   **Echtzeit-Monitoring (simuliert):** Eine Ansicht zeigt simulierte Daten zu Gewinn/Verlust, offenen Positionen und ausstehenden Orders.
*   **Manuelle Eingriffe:** Es gibt Buttons, um simulierte Trades manuell zu schließen.
*   **Einstellungs-Seite mit Persistenz:** Eine separate Seite zur Verwaltung von API-Keys und Handelsparametern, deren Konfigurationen in einer lokalen Datenbank gespeichert werden.
*   **Trade-History:** Eine Seite zur Anzeige vergangener Trades mit Filter- und Sortierfunktionen sowie einer Zusammenfassung von Gesamtgewinn/-verlust und Gebühren.
*   **Lokale Datenbank (Integration vorbereitet):** Die Anwendung ist für die Nutzung einer lokalen SQLite-Datenbank zur Speicherung der Trade-Historie vorbereitet.

**Implementierte Features:**
*   **Visueller Strategie-Editor (Relation-Builder):** Ein Drag-and-Drop-Editor zur visuellen Erstellung von Handelsstrategien wurde implementiert.

**Teilweise implementiert:**
*   **Pine-Script-Engine:** Eine grundlegende Engine existiert, die einfache Indikator-Aufrufe (RSI, MACD) parsen und ausführen kann. Komplexere Logik wird noch nicht unterstützt.
*   **Trading-Engine:** Eine grundlegende Engine (`trading_engine.py`) wurde implementiert, die in einer simulierten Schleife die Pine-Script-Engine oder visuell erstellte Strategien aufruft und Signale generiert.

**Noch nicht implementiert (nur als Platzhalter):**
*   **Echte API-Anbindung:** Die Verbindung zu den Börsen und KI-Diensten ist bisher nur simuliert.

## 3. Architektur

Die Anwendung ist als moderne Web-Anwendung konzipiert, die mit Tauri zu einer Desktop-App für macOS verpackt wird.

*   **Frontend:**
    *   **Framework:** React mit TypeScript
    *   **Build-Tool:** Vite
    *   **Styling:** TailwindCSS
    *   **State Management:** Zustand (für globalen UI-Status)
    *   **Diagramme/Flows:** React Flow (für den "Relation Builder", der aktuell nicht aktiv genutzt wird)
*   **Desktop-Verpackung:**
    *   **Framework:** Tauri (die Konfigurationsdateien sind im `app/src-tauri` Ordner vorhanden)
*   **Backend (geplant):**
    *   Die detaillierte Planung für ein separates Python-Backend mit FastAPI ist in der Datei `BACKEND_ARCHITECTURE.md` dokumentiert.

## 4. Installations- und Setup-Anleitung

> **🐳 EMPFOHLEN: Docker Setup**  
> Für die einfachste und zuverlässigste Entwicklungsumgebung verwenden Sie das Docker-Setup.  
> **→ Siehe [DOCKER_DEVELOPMENT_GUIDE.md](DOCKER_DEVELOPMENT_GUIDE.md) für die vollständige Anleitung**

### Quick Start mit Docker

```bash
# 1. Projekt starten
./start.sh

# 2. Anwendung öffnen
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs

# 3. Projekt stoppen
./stop.sh
```

**Voraussetzungen für Docker:**
*   Docker Desktop installiert und gestartet

### Alternative: Native Installation (Erweitert)

Für Entwickler, die ohne Docker arbeiten möchten:

**Voraussetzungen:**
*   Node.js (Version 18 oder höher) und npm müssen installiert sein.
*   Python 3.11+ für das Backend
*   Optional: Rust für Tauri Desktop-App
*   Git zur Versionsverwaltung.

**Schritte:**

1.  **Code herunterladen:** Klonen Sie das Repository auf Ihren lokalen Computer.
    ```bash
    git clone <repository_url>
    cd <repository_ordner>
    ```

2.  **In das App-Verzeichnis wechseln:** Die gesamte Anwendung befindet sich im Unterordner `app`.
    ```bash
    cd app
    ```

3.  **Abhängigkeiten installieren:** Installieren Sie alle notwendigen Pakete mit npm.
    ```bash
    npm install
    ```

4.  **Frontend im Entwicklungsmodus starten:**
    ```bash
    npm run dev
    ```
    Dies startet den Frontend-Entwicklungsserver. Sie können die Anwendung nun in Ihrem Webbrowser öffnen, üblicherweise unter `http://localhost:5173`.

5.  **Backend-Abhängigkeiten installieren:** Öffnen Sie ein *neues* Terminalfenster und wechseln Sie in das `backend`-Verzeichnis.
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

6.  **Backend-Server starten:** Führen Sie im `backend`-Verzeichnis den folgenden Befehl aus:
    ```bash
    uvicorn main:app --reload
    ```
    Der Backend-Server ist nun unter `http://localhost:8000` erreichbar.

5.  **(Optional) Desktop-App erstellen:**
    *   Installieren Sie die Tauri-Abhängigkeiten (siehe [offizielle Tauri-Anleitung](https://tauri.app/v1/guides/getting-started/prerequisites)).
    *   Starten Sie die Desktop-App im Entwicklungsmodus mit:
        ```bash
        npm run tauri dev
        ```
    *   Erstellen Sie eine finale Installationsdatei mit:
        ```bash
        npm run tauri build
        ```

## 5. Zukünftige Entwicklung (Roadmap)

Hier sind die nächsten logischen Schritte, um das Projekt "peu à peu" weiterzuentwickeln:

1.  **Backend-Implementierung:** Das in `BACKEND_ARCHITECTURE.md` geplante Python/FastAPI-Backend aufbauen.
2.  **Echte API-Anbindung:** Die Frontend-Services in `app/src/services/api.ts` so anpassen, dass sie mit dem echten Backend kommunizieren.
3.  **Pine-Script-Engine fertigstellen:** Den Parser und Interpreter in `app/src/pine-script-engine` implementieren, um echte Strategien ausführen zu können.
4.  **Trading-Engine implementieren:** Die Kernlogik für die automatisierte Ausführung von Trades entwickeln.
5.  **Echte Chart-Bibliothek integrieren:** Eine professionelle Charting-Bibliothek (z.B. TradingView's Lightweight Charts) anstelle der aktuellen Platzhalter einbinden.
6.  **Persistenz für Einstellungen:** Die auf der Einstellungsseite eingegebenen Daten sicher lokal speichern.

## 6. Projektstruktur

*   `app/`: Hauptverzeichnis der React-Anwendung.
    *   `src/`: Der Quellcode der Anwendung.
        *   `components/`: Wiederverwendbare React-Komponenten.
        *   `services/`: Module für die Kommunikation mit dem Backend (API) und der Datenbank.
        *   `store/`: Zustand-Stores für das globale State Management.
        *   `trading-engine/`: Platzhalter für die Trading-Logik.
        *   `pine-script-engine/`: Platzhalter für die Pine-Script-Verarbeitung.
    *   `src-tauri/`: Konfigurationsdateien für die Tauri-Desktop-App.
*   `BACKEND_ARCHITECTURE.md`: Dokumentation der geplanten Backend-Architektur.
*   `WIKI.md`: Diese Datei.
