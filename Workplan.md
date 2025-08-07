# AI-Trading-App-Aug08

# Dev Prompts

Hier werden alle relevanten Entwicklungs-Prompts gesammelt.

KI-PROMPT-DATEI

Ziel

Baue das Interface der App weiter aus – basierend auf der bestehenden Projektstruktur – und bringe die gesamte Benutzeroberfläche optisch und funktional auf das Niveau von TradingView. Nutze dazu das vorhandene Komponentenlayout und integriere gezielt Dark Mode, Struktur, Toolbar, Sidebar, Chart-Zentrum, unteres Panel usw.

⸻

Prompt 1: UI-Konsolidierung auf Basis von TradingViewAppShell
	•	Öffne die Datei TradingViewAppShell.tsx
	•	Integriere alle Kernbereiche dort direkt oder als eingebettete Komponenten:
	•	Linke Sidebar (Navigation/Strategien)
	•	Obere Toolbar (Buttons wie Save, Backtest, Live-Start, KI-Hilfe)
	•	Zentraler Chartbereich (CandlestickChartSection oder TradingViewWidget)
	•	Unteres Konfigurationspanel (Tabs: PineScript, Backtest, RelationBuilder)
	•	Optional: Rechtes Info-Panel (Log, Trades)
	•	Verwende ein CSS Grid oder Flex Layout
	•	Aktiviere Dark Mode via Tailwind (dark:bg-gray-900, dark:text-white etc.)

⸻

Prompt 2: Toolbar einbauen
	•	In TradingViewAppShell.tsx oben eine Toolbar platzieren
	•	Diese soll enthalten:
	•	Button “Speichern”
	•	Button “Backtest starten”
	•	Button “Live-Trading aktivieren”
	•	Button “KI-Assistenz starten”
	•	Jeder Button soll ein Icon und einen Hover-Tooltip haben
	•	Sticky Position (immer sichtbar oben)

⸻

Prompt 3: Sidebar implementieren
	•	Linke Sidebar direkt in TradingViewAppShell.tsx oder auslagern als SidebarNavigation.tsx
	•	Drei Bereiche in der Sidebar:
	•	Strategien
	•	Indikatoren
	•	Templates
	•	Jeder Bereich ist ein aufklappbares Akkordeon (Tailwind UI Accordion oder Disclosure verwenden)
	•	Dark Mode mit Kontrastfarben

⸻

Prompt 4: Hauptchart-Bereich einbauen
	•	Im Zentrum des Layouts CandlestickChartSection.tsx oder TradingViewWidget.tsx einbinden
	•	Komponente soll die gesamte Breite/Höhe des Hauptbereichs nutzen
	•	Responsiv gestalten: Grid- oder Flex-Verhalten testen

⸻

Prompt 5: Unteres Panel (Tabbed View)
	•	Unterhalb des Charts Tab-Navigation einbauen (z. B. mit Shadcn/ui Tabs)
	•	Tabs:
	•	Pine Script Editor (PineScriptPanel)
	•	Relation-Builder (RelationBuilder)
	•	Backtest-Ausgabe (BacktestPanel)
	•	Beim Tab-Wechsel Zustand erhalten

⸻

Prompt 6: Optionales rechtes Info-Panel
	•	Rechts ein ausklappbares Panel für:
	•	Aktive Orders
	•	Positionen
	•	Fehlermeldungen
	•	Nur sichtbar, wenn aktiviert (per Button oder Slide Toggle)

⸻

Prompt 7: Globaler State für UI
	•	Richte globalen UI-State ein (z. B. Zustand oder Redux):
	•	Aktiver Tab unten
	•	Sidebar-Status
	•	Dark Mode
	•	Aktive Strategie-ID

⸻

Prompt 8: Veraltete Komponenten ablösen
	•	MainDashboard.tsx und multi-dashboard.tsx dekommentieren oder leiten intern zu TradingViewAppShell um
	•	Strategiefluss jetzt über strategy.tsx und RelationBuilder konsolidieren

⸻

Prompt 9: Abschlussdesign
	•	Farbschema orientiert an TradingView:
	•	Hintergrund: #1E1E1E
	•	Akzente: #3C3C3C, #4ADE80, #60A5FA, #FACC15
	•	Schrift: #F3F4F6
	•	Icons von Lucide React oder Heroicons
	•	Komponentenkanten rounded-2xl, Schatten shadow-xl, Abstand p-4
	•	Verwende einheitliches Spacing-System (Tailwind z. B. gap-4, space-y-6)

⸻

Nach diesem Prompt-Set soll:
	•	Die App eine klare visuelle Struktur haben
	•	Das Look-and-Feel stark an TradingView erinnern
	•	Bestehende Komponenten integriert und genutzt sein
	•	Ein konsistenter Entwicklungsfluss für weitere Features bestehen
