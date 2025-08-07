import asyncio
import websockets
import json
import pandas as pd
from .pine_script_engine import parser, interpreter

# This state would be managed more robustly in a real application
engine_state = {
    "is_running": False,
    "tasks": {}
}

async def _websocket_client(pair: str, strategy_script: str):
    """
    Connects to a real-time data feed and runs the strategy.
    This is a conceptual implementation.
    """
    # Example: Binance WebSocket URL
    url = f"wss://stream.binance.com:9443/ws/{pair.lower().replace('/', '')}@kline_1m"

    try:
        async with websockets.connect(url) as websocket:
            print(f"Connected to {pair} feed.")
            while engine_state["is_running"]:
                message = await websocket.recv()
                data = json.loads(message)

                # Extract close price from kline data
                close_price = float(data['k']['c'])

                # In a real app, you would accumulate data to form a series
                market_data = {'close': pd.Series([close_price])} # Simplified for this example

                # Execute strategy
                parsed_calls = parser.parse_pine_script(strategy_script)
                results = interpreter.execute_pine_script(parsed_calls, market_data)

                print(f"Strategy results for {pair}: {results}")
                # TODO: Implement signal generation and trade execution logic
    except Exception as e:
        print(f"Error in WebSocket client for {pair}: {e}")

async def _simulation_loop(pair: str, strategy_script: str):
    """
    Simulates a real-time data feed for testing purposes.
    """
    print(f"Starting simulation for {pair}...")

    # Simulate a data series
    close_prices = [100, 102, 105, 103, 106, 108, 110, 109, 112, 115, 113, 111, 114, 117, 120]
    market_data = {'close': pd.Series(close_prices)}

    while engine_state["is_running"]:
        # Execute strategy on the full historical data for this simulation
        parsed_calls = parser.parse_pine_script(strategy_script)
        results = interpreter.execute_pine_script(parsed_calls, market_data)

        # Get the last calculated value as the "current" signal
        last_rsi = results.get('my_rsi', pd.Series(dtype=float)).iloc[-1]

        if not pd.isna(last_rsi):
            print(f"Simulated RSI for {pair}: {last_rsi:.2f}")
            if last_rsi < 30:
                print(f"--- BUY SIGNAL for {pair} ---")
            elif last_rsi > 70:
                print(f"--- SELL SIGNAL for {pair} ---")

        await asyncio.sleep(5) # Simulate 5-second interval

def start_engine_for_pair(pair: str, strategy_script: str):
    """
    Starts the trading engine for a specific trading pair.
    """
    if pair in engine_state["tasks"]:
        print(f"Engine already running for {pair}.")
        return

    # Using the simulation loop for this sandboxed environment
    task = asyncio.create_task(_simulation_loop(pair, strategy_script))
    engine_state["tasks"][pair] = task
    print(f"Engine started for {pair}.")

def stop_engine_for_pair(pair: str):
    """
    Stops the trading engine for a specific trading pair.
    """
    if pair in engine_state["tasks"]:
        engine_state["tasks"][pair].cancel()
        del engine_state["tasks"][pair]
        print(f"Engine stopped for {pair}.")
    else:
        print(f"No engine running for {pair}.")

def start_all_engines(strategies: dict):
    """
    Starts the trading engine for all configured strategies.
    """
    if engine_state["is_running"]:
        print("Engine is already running.")
        return

    engine_state["is_running"] = True
    print("--- Trading Engine Started ---")
    for pair, script in strategies.items():
        start_engine_for_pair(pair, script)

def stop_all_engines():
    """
    Stops all running trading engines.
    """
    if not engine_state["is_running"]:
        print("Engine is not running.")
        return

    engine_state["is_running"] = False
    for pair in list(engine_state["tasks"].keys()):
        stop_engine_for_pair(pair)
    print("--- Trading Engine Stopped ---")
