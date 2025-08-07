# 🚀 AI Trading App

Eine moderne, KI-gestützte Trading-Anwendung für automatisierten Kryptowährungshandel mit Pine Script Strategien.

## 📖 Dokumentation

- **[🏠 WIKI.md](WIKI.md)** - Hauptdokumentation und Projektübersicht
- **[🐳 DOCKER_DEVELOPMENT_GUIDE.md](DOCKER_DEVELOPMENT_GUIDE.md)** - Vollständige Docker-Entwicklungsanleitung
- **[🏗️ BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md)** - Backend-Architektur Dokumentation
- **[🔧 OPEN_ISSUES.md](OPEN_ISSUES.md)** - Bekannte Probleme und TODOs

## ⚡ Quick Start

### Mit Docker (Empfohlen)

```bash
# App starten
./start.sh

# App stoppen  
./stop.sh
```

**Zugriff:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### System Requirements

- Docker Desktop
- 4GB RAM
- 10GB freier Speicherplatz

## 🏗️ Projektstruktur

```
AI-Trading-App-Aug08/
├── app/                          # React Frontend (TypeScript + Vite)
│   ├── src/
│   │   ├── components/          # UI Komponenten
│   │   ├── services/            # API Services
│   │   ├── store/               # State Management (Zustand)
│   │   ├── pine-script-engine/  # Pine Script Parser
│   │   └── trading-engine/      # Trading Logic
│   └── src-tauri/              # Tauri Desktop App Config
├── backend/                     # Python FastAPI Backend
│   ├── routers/                # API Endpoints
│   ├── pine_script_engine/     # Pine Script Interpreter
│   ├── models.py               # Database Models
│   └── main.py                 # FastAPI App
├── docker-compose.yml          # Container Configuration
├── start.sh                    # Quick Start Script
└── stop.sh                     # Stop Script
```

## 🌟 Features

### ✅ Implementiert
- **Moderne UI** - Dark Mode, Multi-Pair Dashboard
- **Multi-Chart Ansicht** - Mehrere Handelspaare parallel
- **Anpassbare Zeitfenster** - 1m, 5m, 1h, etc.
- **Pine Script Engine** - Basis-Indikatoren (RSI, MACD)
- **FastAPI Backend** - REST API mit automatischer Dokumentation
- **Docker Development** - Vollständig containerisierte Entwicklungsumgebung

### 🚧 In Entwicklung
- **Trading Engine** - Automatisierte Handelssignale
- **Börsen-Integration** - Binance, Bitget APIs
- **KI-Integration** - OpenAI, Ollama für Strategie-Optimierung
- **Tauri Desktop App** - Native macOS Anwendung

## 🛠️ Technologie-Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** (Build Tool)
- **TailwindCSS** (Styling)
- **Zustand** (State Management)
- **React Flow** (Node-based UIs)

### Backend  
- **Python 3.11** + **FastAPI**
- **SQLAlchemy** (ORM)
- **Pandas** (Data Processing)
- **Pydantic** (Data Validation)

### DevOps
- **Docker** + **Docker Compose**
- **Hot Reload** (Frontend & Backend)
- **Automated Scripts** (start.sh, stop.sh)

## 🤝 Entwicklung

### Erste Schritte

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd AI-Trading-App-Aug08
   ```

2. **Docker Setup**
   ```bash
   ./start.sh
   ```

3. **Entwickeln**
   - Frontend Code: `./app/src/`
   - Backend Code: `./backend/`
   - Automatisches Hot-Reload aktiv

### Nützliche Commands

```bash
# Container Status
docker-compose ps

# Logs anzeigen
docker-compose logs -f

# Services neustarten
docker-compose restart frontend
docker-compose restart backend

# In Container einsteigen
docker-compose exec frontend sh
docker-compose exec backend bash

# Cleanup
./stop.sh
docker system prune -a
```

## 📈 Roadmap

### Phase 1: Core Trading Engine
- [ ] Echte Börsen-API Integration
- [ ] Erweiterte Pine Script Unterstützung
- [ ] Portfolio Management

### Phase 2: KI Integration
- [ ] Strategie-Optimierung mit AI
- [ ] Marktanalyse und Predictions
- [ ] Risk Management AI

### Phase 3: Desktop App
- [ ] Tauri Desktop Packaging
- [ ] Native System Integration
- [ ] Offline Capabilities

## 🔗 Links

- **Live Demo**: http://localhost:5173 (nach `./start.sh`)
- **API Docs**: http://localhost:8000/docs
- **GitHub**: [Repository Link]

## 📄 Lizenz

[Lizenz Information hier einfügen]

---

**🐳 Schnellstart: `./start.sh` → http://localhost:5173**
