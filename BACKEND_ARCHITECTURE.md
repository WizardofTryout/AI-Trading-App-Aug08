# Backend Architecture Plan

This document outlines the proposed backend architecture for the AI Trading App.

## 1. Overview

The backend will be a separate application that the frontend communicates with via a REST API and WebSockets. It will be responsible for:
*   Connecting to cryptocurrency exchanges (Bitget, Binance).
*   Managing and executing trading strategies for multiple trading pairs simultaneously.
*   Streaming real-time market data and trade updates to the frontend.
*   Integrating with AI systems (Ollama).
*   Managing user data, such as API keys and strategies.
*   Storing and retrieving trade history from a local SQLite database.

## 2. Technology Stack

*   **Language**: Python
*   **Framework**: FastAPI (with WebSocket support)
*   **Database**: SQLite
*   **ORM**: SQLAlchemy
*   **Task Queue**: Celery with Redis
*   **Deployment**: Docker

## 3. Core Components

### 3.1. API Server (FastAPI)

The main entry point for the frontend. It will expose endpoints for:
*   **Authentication**: User login and API key management.
*   **Strategies**: CRUD operations for trading strategies.
*   **Pine Script**: Uploading, managing, and compiling Pine Scripts.
*   **Exchanges**: Connecting to exchanges and fetching market data and available trading pairs.
*   **Trading**: Placing and managing orders.
*   **AI**: Interacting with the AI assistant.
*   **Settings**: Storing and retrieving user settings, including API keys and trading parameters.
*   **Trade History**: Storing and retrieving trade history from the local database.

### 3.2. WebSocket Server (FastAPI)

The WebSocket server will be responsible for streaming real-time data to the frontend, including:
*   Market data (candlestick data, order book).
*   Trade updates (pnl, open positions, pending orders).

### 3.3. Database (SQLite)

The database will be a local SQLite database file. It will store:
*   User accounts and encrypted API keys.
*   Trading strategies and their configurations for each trading pair.
*   Pine Script files.
*   Trade history and performance data.

### 3.4. Trading Engine (Celery)

The trading engine will be a set of Celery tasks that run in the background. It will be responsible for:
*   **Strategy Execution**: Running the trading strategies for multiple trading pairs and generating trading signals.
*   **Order Execution**: Placing and managing orders on the exchanges.
*   **Data Fetching**: Fetching real-time market data from the exchanges.
*   **Data Logging**: Logging all trades to the SQLite database.

### 3.5. Pine Script Engine

This component will be responsible for parsing and executing Pine Scripts. We can explore using existing Python libraries that can interpret a subset of Pine Script, or build a custom interpreter.

### 3.6. AI Integration (Ollama)

The backend will communicate with a local Ollama instance to provide AI-powered features, such as:
*   Natural language explanations of trading strategies.
*   AI-assisted strategy creation.
*   Market analysis and insights.

## 4. Deployment

The entire backend will be containerized using Docker for easy deployment. It can be deployed on the user's local machine or on a remote server.

## 5. Next Steps

1.  Set up the Python project with FastAPI and other dependencies.
2.  Design the database schema to support multiple trading pairs.
3.  Implement the API endpoints for user authentication and API key management.
4.  Implement the connection to the Bitget and Binance APIs, including fetching available trading pairs.
5.  Implement the WebSocket server for real-time data streaming.
6.  Develop the Pine Script engine.
7.  Implement the trading engine with Celery to handle multiple trading pairs and log trades to the database.
8.  Integrate with Ollama.
