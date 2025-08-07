# Offene Aufgaben & Entwicklungsplan

Dieses Dokument listet die nächsten großen Entwicklungsschritte für die AI-Trading-App auf. Jeder Abschnitt kann als separates "Issue" im GitHub Issue Tracker angelegt werden, um die Arbeit zu organisieren und parallelisieren.

---

### Issue #1: Implementierung des Backends

**Titel:** `[Task] Backend-Services implementieren`

**Beschreibung:**
Dieses Issue umfasst den Aufbau des Python/FastAPI-Backends gemäß dem Plan in `BACKEND_ARCHITECTURE.md`. Dies ist die Grundlage für die gesamte serverseitige Logik, einschließlich der Anbindung an die Börsen und der Ausführung der Handelslogik.

**Akzeptanzkriterien:**
- [ ] Ein grundlegender FastAPI-Server ist aufgesetzt und läuft.
- [ ] API-Endpunkte für die Einstellungsseite (GET/POST für API-Keys und Handelsparameter) sind implementiert.
- [ ] Die Verbindung zur lokalen SQLite-Datenbank ist hergestellt.
- [ ] Die API-Endpunkte können Daten aus der Datenbank lesen und schreiben (z.B. Trade-Historie).

**Labels:** `backend`, `critical`

---

### Issue #2: Pine-Script-Engine fertigstellen

**Titel:** `[Task] Pine-Script-Engine implementieren`

**Status:** `In Bearbeitung`

**Beschreibung:**
Eine grundlegende, vereinfachte Version der Pine-Script-Engine wurde implementiert. Sie verwendet einen Regex-basierten Parser und einen Interpreter, um Indikator-Aufrufe auszuführen. Die Bibliothek `indicators.py` enthält Implementierungen für RSI und MACD.

**Nächste Schritte / Verbleibende Arbeit:**
- [ ] Den Parser erweitern, um komplexere Ausdrücke und Logik zu unterstützen (z.B. `if`, `else`, Vergleichsoperatoren).
- [ ] Die Indikatoren-Bibliothek um weitere gängige Indikatoren erweitern (z.B. Bollinger Bänder, Moving Averages).
- [ ] Fehlerbehandlung im Parser und Interpreter verbessern.

**Labels:** `backend`, `feature`, `pine-script`

---

### Issue #3: Echtzeit-Datenverarbeitung & Trading-Engine

**Titel:** `[Task] Echtzeit-Daten-Engine implementieren`

**Status:** `In Bearbeitung`

**Beschreibung:**
Eine grundlegende Trading-Engine (`trading_engine.py`) wurde implementiert. Sie enthält den Code für eine WebSocket-Verbindung und eine Simulationsschleife, die neue Datenpunkte simuliert, die Pine-Script-Engine aufruft und Handelssignale generiert. Es wurden API-Endpunkte zur Steuerung der Engine hinzugefügt.

**Nächste Schritte / Verbleibende Arbeit:**
- [ ] Die Simulationsschleife durch eine echte WebSocket-Datenverarbeitung ersetzen.
- [ ] Die Logik zur Generierung von Handelssignalen verfeinern.
- [ ] Eine robuste Fehlerbehandlung und Zustandsverwaltung für die Engine implementieren.
- [ ] Die Engine so erweitern, dass sie mehrere Strategien für verschiedene Handelspaare parallel ausführen kann.

**Labels:** `backend`, `real-time`, `trading-engine`

---

### Issue #4: Echte Chart-Bibliothek integrieren

**Titel:** `[Enhancement] Echte Chart-Bibliothek integrieren`

**Status:** `Abgeschlossen`

**Beschreibung:**
Die Platzhalter-Charts wurden durch die **TradingView Lightweight Charts** Bibliothek ersetzt. Es wurde eine React-Wrapper-Komponente (`LightweightChart.tsx`) erstellt, die interaktive Charts anzeigt. Die Datenaktualisierung wird derzeit im Frontend simuliert, um die Echtzeitfähigkeit zu demonstrieren.

**Akzeptanzkriterien:**
- [x] Eine Chart-Bibliothek (TradingView's Lightweight Charts) ist in der `CandlestickChartSection`-Komponente implementiert.
- [x] Der Chart kann (simulierte) Echtzeit-Daten darstellen und aktualisieren.
- [x] Die vom Nutzer ausgewählten Zeitfenster (1m, 5m, etc.) werden im Chart-Header angezeigt und können zur Datenabfrage verwendet werden.

**Labels:** `frontend`, `enhancement`, `ui`

---

### Issue #5: Persistenz der Benutzereinstellungen

**Titel:** `[Task] Speicherung der Benutzereinstellungen implementieren`

**Beschreibung:**
Die auf der Einstellungsseite eingegebenen Daten (API-Keys, Handelsparameter) sind bisher nur im Frontend-State vorhanden und gehen beim Schließen der App verloren. Sie müssen sicher in der lokalen Datenbank gespeichert werden.

**Akzeptanzkriterien:**
- [ ] Beim Klick auf "Save Settings" werden die Daten über die API an das Backend gesendet und in der SQLite-Datenbank gespeichert.
- [ ] Beim Start der Anwendung werden die gespeicherten Einstellungen geladen und in den Feldern angezeigt.
- [ ] Sensible Daten wie API-Keys werden vor der Speicherung verschlüsselt.

**Labels:** `backend`, `frontend`, `settings`, `security`

---

### Issue #6 (Optional): "Relation-Builder" finalisieren

**Titel:** `[Feature] "Relation-Builder" für visuelle Strategien fertigstellen`

**Beschreibung:**
Die ursprüngliche Idee eines visuellen Drag-and-Drop-Editors für Strategien wurde zurückgestellt. Dieses Issue würde die Wiederaufnahme und Fertigstellung dieser Funktion umfassen.

**Akzeptanzkriterien:**
- [ ] Die `RelationBuilder`-Komponente ist wieder in die UI integriert.
- [ ] Ein im Editor erstellter visueller Graph kann in eine ausführbare Strategie (z.B. JSON-Format) übersetzt werden.
- [ ] Die Trading-Engine kann diese übersetzte Strategie ausführen.

**Labels:** `feature`, `frontend`, `ui`
