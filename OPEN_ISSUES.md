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

**Beschreibung:**
Die bestehenden Dateien `parser.ts` und `interpreter.ts` sind aktuell nur Platzhalter. In dieser Aufgabe soll die Logik implementiert werden, um Pine-Script-Code tatsächlich zu parsen und auszuführen. Dies ist ein Kernstück, um benutzerdefinierte Strategien zu ermöglichen.

**Akzeptanzkriterien:**
- [ ] Der Parser kann eine definierte Teilmenge von Pine-Script in einen Abstract Syntax Tree (AST) umwandeln.
- [ ] Der Interpreter kann den generierten AST mit gegebenen Marktdaten (z.B. Candlestick-Daten) ausführen.
- [ ] Gängige Indikatoren wie RSI und MACD werden korrekt berechnet und können in Strategien verwendet werden.

**Labels:** `backend`, `feature`, `pine-script`

---

### Issue #3: Echtzeit-Datenverarbeitung & Trading-Engine

**Titel:** `[Task] Echtzeit-Daten-Engine implementieren`

**Beschreibung:**
Diese Aufgabe beinhaltet die Anbindung an die WebSocket-API von Börsen wie Bitget oder Binance, um einen kontinuierlichen Strom von Marktdaten zu erhalten. Die Trading-Engine muss diese Daten verarbeiten und die unter Issue #2 erstellte Pine-Script-Engine damit füttern.

**Akzeptanzkriterien:**
- [ ] Das Backend kann eine stabile WebSocket-Verbindung zu einer Börsen-API herstellen.
- [ ] Eingehende Echtzeit-Preisdaten werden korrekt verarbeitet.
- [ ] Die Trading-Engine führt die gespeicherten Nutzerstrategien bei jeder neuen Datenaktualisierung aus.
- [ ] Wenn eine Strategiebedingung erfüllt ist, wird ein klares Handelssignal (KAUFEN/VERKAUFEN) generiert.

**Labels:** `backend`, `real-time`, `trading-engine`

---

### Issue #4: Echte Chart-Bibliothek integrieren

**Titel:** `[Enhancement] Echte Chart-Bibliothek integrieren`

**Beschreibung:**
Die aktuellen Charts sind nur Platzhalter. Um eine professionelle Analyse zu ermöglichen, sollte eine spezialisierte Charting-Bibliothek integriert werden, die interaktive Features wie Zoomen, Panning und das Einzeichnen von Indikatoren unterstützt.

**Akzeptanzkriterien:**
- [ ] Eine Chart-Bibliothek (z.B. TradingView's Lightweight Charts) ist in der `CandlestickChartSection`-Komponente implementiert.
- [ ] Der Chart kann Echtzeit-Daten, die vom Backend kommen, darstellen und aktualisieren.
- [ ] Die vom Nutzer ausgewählten Zeitfenster (1m, 5m, etc.) werden korrekt im Chart angewendet.

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
