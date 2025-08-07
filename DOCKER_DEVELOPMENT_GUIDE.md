# 🐳 Docker Development Guide - AI Trading App

## 📋 Übersicht

Diese Anleitung beschreibt die vollständige Docker-basierte Entwicklungsumgebung für die AI Trading App. Mit diesem Setup können Sie die gesamte Anwendung (Frontend + Backend) mit einem einzigen Befehl starten, ohne Node.js, Python oder andere Dependencies lokal installieren zu müssen.

## 🎯 Warum Docker?

### ✅ Vorteile
- **Isolation**: Keine Konflikte mit dem macOS-System
- **Konsistenz**: Identische Umgebung für alle Entwickler
- **Einfache Installation**: Nur Docker Desktop erforderlich
- **Saubere Entwicklung**: Vollständige Entfernung durch Container-Löschung
- **Skalierbar**: Einfaches Hinzufügen weiterer Services (Redis, PostgreSQL, etc.)
- **Entwicklerfreundlich**: Hot-Reload für alle Code-Änderungen

### ❌ Ohne Docker (Native Installation)
- Node.js v18+ Installation erforderlich
- Python 3.11+ Installation erforderlich  
- Rust Installation für Tauri erforderlich
- Potentielle Versionskonflikte
- Komplexes Dependency Management
- Schwieriger zu warten und zu debuggen

## 🛠 System-Voraussetzungen

- **Docker Desktop** (Version 4.0+)
- **Docker Compose** (Version 2.0+)
- **4GB freier RAM**
- **10GB freier Speicherplatz**
- **macOS, Windows oder Linux**

### Docker Installation (macOS)

```bash
# Mit Homebrew
brew install --cask docker

# Oder manuell von https://docker.com/products/docker-desktop
```

## 🚀 Quick Start

### 1. Projekt starten

```bash
# Automatisches Setup mit dem bereitgestellten Script
./start.sh

# Oder manuell
docker-compose up --build -d
```

### 2. Anwendung öffnen

- **🌐 Frontend**: http://localhost:5173
- **🔧 Backend API**: http://localhost:8000  
- **📚 API Dokumentation**: http://localhost:8000/docs

### 3. Projekt stoppen

```bash
# Mit dem bereitgestellten Script
./stop.sh

# Oder manuell
docker-compose down
```

## 📦 Container-Architektur

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │
│   React + Vite  │    │   Python FastAPI│
│   Port: 5173    │◄──►│   Port: 8000    │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
```

### Container Details

| Service | Image | Port | Beschreibung |
|---------|-------|------|--------------|
| **frontend** | `node:18-alpine` | 5173 | React + TypeScript + Vite |
| **backend** | `python:3.11-slim` | 8000 | FastAPI + SQLAlchemy + Pine Script Engine |

## 🔧 Entwicklungsworkflow

### Code-Änderungen

```bash
# Frontend Code bearbeiten
# Dateien in ./app/src/ ändern
# → Automatisches Hot-Reload im Browser

# Backend Code bearbeiten  
# Dateien in ./backend/ ändern
# → Automatischer Server-Neustart
```

### Container-Management

```bash
# Alle Services starten
docker-compose up -d

# Bestimmten Service starten
docker-compose up frontend
docker-compose up backend

# Services neu starten
docker-compose restart frontend
docker-compose restart backend

# Services stoppen
docker-compose down

# Mit Volume-Löschung (Clean Reset)
docker-compose down -v
```

### Logs und Debugging

```bash
# Alle Logs anzeigen
docker-compose logs -f

# Spezifische Service-Logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Container Status prüfen
docker-compose ps

# In Container einsteigen
docker-compose exec frontend sh     # Frontend
docker-compose exec backend bash    # Backend
```

## 📚 Dependencies verwalten

### Frontend Dependencies (npm)

```bash
# Container betreten
docker-compose exec frontend sh

# Package installieren
npm install <package-name>

# Package entfernen
npm uninstall <package-name>

# Container neustarten um Changes zu laden
docker-compose restart frontend
```

### Backend Dependencies (pip)

```bash
# Container betreten
docker-compose exec backend bash

# Package installieren
pip install <package-name>

# requirements.txt aktualisieren
pip freeze > requirements.txt

# Container neu bauen (für permanente Changes)
docker-compose up --build backend
```

## 🧪 API Testing

### Backend API Endpoints

| Endpoint | Methode | Beschreibung |
|----------|---------|--------------|
| `/` | GET | Health Check |
| `/docs` | GET | Swagger UI Dokumentation |
| `/settings` | GET/POST | Trading-Einstellungen verwalten |
| `/trades` | GET/POST | Trade-Historie anzeigen/erstellen |
| `/strategy/execute` | POST | Pine Script Strategien ausführen |

### Beispiel API-Calls

```bash
# Health Check
curl http://localhost:8000/

# API Dokumentation im Browser öffnen
open http://localhost:8000/docs

# Settings abrufen
curl http://localhost:8000/settings

# Trades abrufen
curl http://localhost:8000/trades
```

## 🛠 Troubleshooting

### Häufige Probleme

#### Port bereits belegt

```bash
# Prüfen welcher Prozess Port belegt
sudo lsof -i :5173  # Frontend
sudo lsof -i :8000  # Backend

# Prozess beenden
sudo kill -9 <PID>

# Oder anderen Port verwenden (docker-compose.yml ändern)
```

#### Container startet nicht

```bash
# Detaillierte Logs anzeigen
docker-compose logs <service-name>

# Container neu bauen
docker-compose up --build <service-name>

# Alle Container und Images löschen (Nuclear Option)
docker-compose down --rmi all -v
docker system prune -a
```

#### Speicherplatz-Probleme

```bash
# Docker Speicher freigeben
docker image prune              # Ungenutzte Images
docker container prune          # Gestoppte Container  
docker volume prune             # Ungenutzte Volumes
docker system prune -a          # Alles ungenutzte (Vorsicht!)
```

#### Volume-Probleme

```bash
# Volumes neu erstellen
docker-compose down -v
docker-compose up --build
```

### Performance-Optimierung

```bash
# Container ohne Cache neu bauen
docker-compose build --no-cache

# Nur spezifischen Service neu bauen
docker-compose up --build frontend

# Docker Desktop Memory erhöhen (Settings > Resources > Memory)
```

## 📝 Entwicklungs-Checkliste

### Vor dem Start
- [ ] Docker Desktop läuft
- [ ] Ports 5173 und 8000 sind frei
- [ ] Genügend Speicherplatz verfügbar (>10GB)

### Täglicher Workflow
- [ ] `./start.sh` oder `docker-compose up -d`
- [ ] Frontend unter http://localhost:5173 testen
- [ ] Backend unter http://localhost:8000 testen
- [ ] Code-Änderungen werden automatisch geladen
- [ ] `./stop.sh` oder `docker-compose down` nach der Arbeit

### Nach Code-Änderungen
- [ ] Hot-Reload funktioniert automatisch
- [ ] Bei neuen Dependencies: Container neu bauen
- [ ] API-Änderungen unter /docs testen
- [ ] Logs bei Problemen prüfen

## 🔄 Git Integration

### .gitignore Empfehlungen

```gitignore
# Docker
.env
docker-compose.override.yml

# Logs
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

### Development Branches

```bash
# Feature Branch mit Docker testen
git checkout -b feature/new-trading-algorithm
# Code ändern
docker-compose up -d
# Testen unter http://localhost:5173
```

## 🚢 Production Deployment

### Production Docker Compose

```yaml
# docker-compose.prod.yml (Beispiel)
version: '3.8'
services:
  frontend:
    build:
      context: ./app
      dockerfile: Dockerfile.prod
    ports:
      - "80:80"
    
  backend:
    build:
      context: ./backend  
      dockerfile: Dockerfile.prod
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=production
```

```bash
# Production Build
docker-compose -f docker-compose.prod.yml up --build -d
```

## 📊 Monitoring & Logs

### Log-Management

```bash
# Logs mit Timestamps
docker-compose logs -f -t

# Logs in Datei speichern
docker-compose logs > app-logs.txt

# Nur Fehler anzeigen
docker-compose logs | grep ERROR

# Log-Rotation aktivieren (docker-compose.yml)
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

### Performance Monitoring

```bash
# Container Ressourcen-Verbrauch
docker stats

# Container Details
docker-compose top
```

## 🔧 Erweiterte Konfiguration

### Environment Variables

```bash
# .env Datei erstellen
echo "VITE_API_URL=http://localhost:8000" > app/.env
echo "DATABASE_URL=sqlite:///./trading.db" > backend/.env
```

### Custom Networks

```yaml
# Erweiterte docker-compose.yml
networks:
  trading-network:
    driver: bridge

services:
  frontend:
    networks:
      - trading-network
  backend:
    networks:
      - trading-network
```

## 📚 Zusätzliche Services

### Redis (für Caching)

```yaml
redis:
  image: redis:alpine
  ports:
    - "6379:6379"
```

### PostgreSQL (für Production)

```yaml
database:
  image: postgres:15
  environment:
    POSTGRES_DB: trading_app
    POSTGRES_USER: trading_user
    POSTGRES_PASSWORD: trading_pass
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

## 🆘 Support & Community

### Häufige Commands als Referenz

```bash
# Quick Reference
./start.sh                          # App starten
./stop.sh                           # App stoppen
docker-compose ps                   # Status anzeigen
docker-compose logs -f              # Logs verfolgen
docker-compose restart backend      # Backend neustarten
docker-compose exec frontend sh     # Frontend Terminal
docker-compose down -v              # Alles löschen
docker system prune -a              # Docker aufräumen
```

### Bei Problemen

1. **Logs prüfen**: `docker-compose logs`
2. **Container Status**: `docker-compose ps`
3. **Port-Konflikte**: `sudo lsof -i :5173` und `sudo lsof -i :8000`
4. **Docker Reset**: `docker-compose down -v && docker system prune -a`
5. **Neu aufbauen**: `docker-compose up --build --force-recreate`

---

## 🎉 Fazit

Mit diesem Docker-Setup haben Sie eine professionelle, isolierte und konsistente Entwicklungsumgebung für die AI Trading App. Das Setup:

- ✅ Funktioniert out-of-the-box
- ✅ Erfordert nur Docker Desktop
- ✅ Unterstützt Hot-Reload für Frontend und Backend
- ✅ Ist einfach zu warten und zu erweitern
- ✅ Kann problemlos in CI/CD integriert werden

**Happy Coding! 🚀**
