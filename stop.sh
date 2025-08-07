#!/bin/bash

# AI Trading App - Cleanup Script
# Stoppt und entfernt alle Docker Container und Images

echo "🧹 AI Trading App - Cleanup wird gestartet..."
echo

# Container stoppen
echo "⏹️  Stoppe alle Services..."
docker-compose down

# Optional: Images löschen (auskommentiert zur Sicherheit)
# echo "🗑️  Lösche Docker Images..."
# docker-compose down --rmi all

# Optional: Volumes löschen (auskommentiert zur Sicherheit)
# echo "🗑️  Lösche Docker Volumes..."
# docker-compose down -v

echo
echo "✅ Cleanup abgeschlossen!"
echo
echo "📦 Verbleibende Docker Ressourcen:"
echo "   Container:"
docker ps -a | grep ai-trading-app || echo "   Keine AI Trading App Container gefunden"
echo
echo "   Images:"
docker images | grep ai-trading-app || echo "   Keine AI Trading App Images gefunden"
echo

echo "💡 Für vollständiges Cleanup (Achtung: löscht alle Daten!):"
echo "   docker-compose down --rmi all -v"
echo
echo "💡 Zum erneuten Starten:"
echo "   ./start.sh"
