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

### Issue #2 & #3: Pine-Script- & Trading-Engine erweitert

**Titel:** `[Task] Pine-Script- und Trading-Engine erweitern`

**Status:** `Abgeschlossen`

**Beschreibung:**
Die Pine-Script-Engine wurde erweitert, um nicht nur Indikatoren, sondern auch einfache logische Bedingungen (z.B. `rsi > 70`) zu parsen und auszuwerten. Die Trading-Engine wurde aktualisiert, um diese erweiterte Logik zu nutzen und in ihrer Simulationsschleife konkrete Kauf-/Verkaufssignale zu generieren. Dies schließt die grundlegende Implementierung von Issue #2 und #3 ab.

**Nächste Schritte / Verbleibende Arbeit:**
- [ ] **Parser verbessern:** Unterstützung für komplexere Logik (z.B. `and`, `or`, Crossover-Funktionen) hinzufügen.
- [ ] **Indikatoren-Bibliothek erweitern:** Weitere Indikatoren (z.B. Bollinger Bänder) implementieren.
- [ ] **Echte WebSocket-Anbindung:** Die Simulation in der Trading-Engine durch eine echte, stabile WebSocket-Verbindung ersetzen.
- [ ] **Trade-Ausführung:** Die generierten Signale nutzen, um über die Börsen-API tatsächlich Trades auszuführen.

**Labels:** `backend`, `feature`, `pine-script`, `trading-engine`

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

**Status:** `Abgeschlossen`

**Beschreibung:**
Die Benutzereinstellungen werden nun über einen Backend-Endpunkt in der lokalen SQLite-Datenbank gespeichert. Das Frontend ruft die Einstellungen beim Start ab und sendet sie beim Speichern an das Backend. Im Backend wurden Platzhalter für die Verschlüsselung von API-Keys hinzugefügt.

**Akzeptanzkriterien:**
- [x] Beim Klick auf "Save Settings" werden die Daten über die API an das Backend gesendet und in der SQLite-Datenbank gespeichert.
- [x] Beim Start der Anwendung werden die gespeicherten Einstellungen geladen und in den Feldern angezeigt.
- [x] Sensible Daten wie API-Keys werden (konzeptionell durch Platzhalter) verschlüsselt.

**Labels:** `backend`, `frontend`, `settings`, `security`

---

### Issue #6 (Optional): "Relation-Builder" finalisieren

**Titel:** `[Feature] "Relation-Builder" für visuelle Strategien fertigstellen`

**Status:** `Abgeschlossen`

**Beschreibung:**
Der Relation-Builder wurde wieder in die Benutzeroberfläche integriert und ist über die Seitenleiste erreichbar. Er ermöglicht das Erstellen von visuellen Strategien durch Drag-and-Drop. Eine Übersetzungsfunktion wandelt den Graphen in ein JSON-Format um, und die Trading-Engine wurde angepasst, um dieses Format auszuführen.

**Akzeptanzkriterien:**
- [x] Die `RelationBuilder`-Komponente ist wieder in die UI integriert.
- [x] Ein im Editor erstellter visueller Graph kann in eine ausführbare Strategie (JSON-Format) übersetzt werden.
- [x] Die Trading-Engine kann diese übersetzte Strategie ausführen.
- [x] Es gibt API-Endpunkte zum Speichern und Laden der visuellen Strategien.

**Labels:** `feature`, `frontend`, `ui`
