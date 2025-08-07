#!/bin/bash

# AI Trading App - Quick Setup Script
# Dieses Script startet die komplette Anwendung mit Docker

echo "🚀 AI Trading App - Docker Setup wird gestartet..."
echo

# Überprüfen ob Docker läuft
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker ist nicht gestartet oder nicht installiert."
    echo "   Bitte starten Sie Docker Desktop und versuchen Sie es erneut."
    exit 1
fi

echo "✅ Docker ist verfügbar"

# Prüfen ob Port 5173 und 8000 frei sind
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 5173 ist bereits belegt. Stoppe bestehende Services..."
    docker-compose down 2>/dev/null || true
fi

if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 8000 ist bereits belegt. Stoppe bestehende Services..."
    docker-compose down 2>/dev/null || true
fi

# Container bauen und starten
echo "🔨 Docker Container werden gebaut und gestartet..."
echo "   Dies kann beim ersten Mal 2-3 Minuten dauern..."
echo

if docker-compose up --build -d; then
    echo
    echo "✅ Setup erfolgreich abgeschlossen!"
    echo
    echo "📱 Ihre AI Trading App ist jetzt verfügbar unter:"
    echo "   🌐 Frontend:    http://localhost:5173"
    echo "   🔧 Backend API: http://localhost:8000"
    echo "   📚 API Docs:    http://localhost:8000/docs"
    echo
    echo "📋 Nützliche Befehle:"
    echo "   🔍 Logs anzeigen:     docker-compose logs -f"
    echo "   ⏹️  Services stoppen:  docker-compose down"
    echo "   🔄 Services neustarten: docker-compose restart"
    echo
    echo "📦 Container Status:"
    docker-compose ps
    echo
    
    # Warten bis Services bereit sind
    echo "⏳ Warte bis Services bereit sind..."
    sleep 5
    
    # Testen ob Services erreichbar sind
    if curl -s http://localhost:8000/ > /dev/null 2>&1; then
        echo "✅ Backend ist bereit"
    else
        echo "⚠️  Backend noch nicht bereit, ggf. etwas warten..."
    fi
    
    if curl -s http://localhost:5173/ > /dev/null 2>&1; then
        echo "✅ Frontend ist bereit"
    else
        echo "⚠️  Frontend noch nicht bereit, ggf. etwas warten..."
    fi
    
    echo
    echo "🎉 Die AI Trading App ist jetzt einsatzbereit!"
    echo "   Öffnen Sie http://localhost:5173 in Ihrem Browser"
    
else
    echo
    echo "❌ Setup fehlgeschlagen. Prüfen Sie die Logs:"
    echo "   docker-compose logs"
    exit 1
fi
