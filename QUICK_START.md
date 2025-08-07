# 🚀 Quick Start Guide

## Sofort loslegen (2 Minuten)

```bash
# 1. App starten
./start.sh

# 2. Browser öffnen
open http://localhost:5173
```

## Was passiert?

- ✅ Frontend startet auf http://localhost:5173
- ✅ Backend startet auf http://localhost:8000  
- ✅ Hot-Reload aktiviert für alle Code-Änderungen
- ✅ API Dokumentation verfügbar unter /docs

## Stoppen

```bash
./stop.sh
```

## Dokumentation

- **[📖 Vollständige Dokumentation](WIKI.md)**
- **[🐳 Docker Development Guide](DOCKER_DEVELOPMENT_GUIDE.md)**

## Bei Problemen

```bash
# Logs anzeigen
docker-compose logs -f

# Container Status
docker-compose ps

# Cleanup & Neustart
./stop.sh
docker system prune -a
./start.sh
```

**Das ist alles! Happy Coding! 🎉**
