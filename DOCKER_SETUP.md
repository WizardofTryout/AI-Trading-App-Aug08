# Docker Development Environment

## Quick Start

1. **Alle Services starten:**
   ```bash
   docker-compose up --build
   ```

2. **Services einzeln starten:**
   ```bash
   # Nur Backend
   docker-compose up backend
   
   # Nur Frontend
   docker-compose up frontend
   ```

3. **Services im Hintergrund starten:**
   ```bash
   docker-compose up -d
   ```

4. **Logs anzeigen:**
   ```bash
   # Alle Services
   docker-compose logs -f
   
   # Nur Frontend
   docker-compose logs -f frontend
   
   # Nur Backend
   docker-compose logs -f backend
   ```

5. **Services stoppen:**
   ```bash
   docker-compose down
   ```

## Zugriff

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Backend Docs**: http://localhost:8000/docs (FastAPI Swagger UI)

## Development Workflow

### Code-Änderungen
- **Frontend**: Änderungen in `./app` werden automatisch neu geladen
- **Backend**: Änderungen in `./backend` werden automatisch neu geladen

### Dependencies hinzufügen

**Frontend (Node.js):**
```bash
# Container betreten
docker-compose exec frontend sh

# Package installieren
npm install package-name

# Oder direkt
docker-compose exec frontend npm install package-name
```

**Backend (Python):**
```bash
# Container betreten
docker-compose exec backend bash

# Package installieren
pip install package-name

# requirements.txt aktualisieren
pip freeze > requirements.txt
```

### Debugging

**Frontend Debugging:**
```bash
# Container betreten
docker-compose exec frontend sh

# Node.js Debug-Modus
npm run dev
```

**Backend Debugging:**
```bash
# Container betreten
docker-compose exec backend bash

# Python REPL starten
python

# Oder spezifische Module testen
python -c "from main import app; print('Backend works!')"
```

## Nützliche Befehle

```bash
# Container neu bauen (nach Dockerfile-Änderungen)
docker-compose up --build

# Alle Container und Volumes löschen (Clean Slate)
docker-compose down -v
docker-compose build --no-cache

# Nur spezifischen Service neu bauen
docker-compose up --build frontend

# Container Status prüfen
docker-compose ps

# Container Shell betreten
docker-compose exec frontend sh    # Frontend
docker-compose exec backend bash   # Backend
```

## Produktions-Deployment

Für Produktion können separate `Dockerfile` (ohne `.dev` Suffix) erstellt werden:

```bash
# Produktions-Container bauen
docker build -t ai-trading-frontend ./app
docker build -t ai-trading-backend ./backend
```

## Troubleshooting

**Port bereits belegt:**
```bash
# Andere Services auf Port prüfen
lsof -i :5173  # Frontend
lsof -i :8000  # Backend

# Docker-Container auf anderen Ports starten
# Ändern Sie in docker-compose.yml: "5174:5173" statt "5173:5173"
```

**Docker Speicherplatz:**
```bash
# Ungenutzte Images löschen
docker image prune

# Alles löschen (Vorsicht!)
docker system prune -a
```

**Volume-Probleme:**
```bash
# Volumes neu erstellen
docker-compose down -v
docker-compose up --build
```
