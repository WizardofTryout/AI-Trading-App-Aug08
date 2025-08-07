import asyncio
import websockets
import json
import pandas as pd
from pine_script_engine import parser, interpreter
import indicators

# This state would be managed more robustly in a real application
engine_state = {
    "is_running": False,
    "tasks": {}
}

def execute_json_strategy(strategy: dict, market_data: dict):
    """
    Executes a strategy defined in a JSON format.
    """
    condition = strategy.get("condition", {})
    op = condition.get("operator")
    inputs = condition.get("inputs", [])

    if not op or len(inputs) != 2:
        return None # Invalid format

    # Resolve inputs
    resolved_inputs = []
    for i in inputs:
        if i["type"] == "indicator":
            indicator_func = getattr(indicators, i["name"])
            # Assuming the first param is always the data series
            series = market_data[i["params"]["source"]]
            params = {k: v for k, v in i["params"].items() if k != "source"}
            resolved_inputs.append(indicator_func(series, **params).iloc[-1])
        elif i["type"] == "value":
            resolved_inputs.append(i["value"])

    # Evaluate condition
    if op == '>':
        return resolved_inputs[0] > resolved_inputs[1]
    elif op == '<':
        return resolved_inputs[0] < resolved_inputs[1]

    return None


async def _websocket_client(pair: str, strategy: dict):
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
                result = execute_json_strategy(strategy, market_data)

                print(f"Strategy results for {pair}: {result}")
                # TODO: Implement signal generation and trade execution logic
    except Exception as e:
        print(f"Error in WebSocket client for {pair}: {e}")

async def _simulation_loop(pair: str, strategy: dict):
    """
    Simulates a real-time data feed for testing purposes.
    """
    print(f"Starting simulation for {pair} with strategy: {strategy}")

    # Simulate a data series
    close_prices = [100, 102, 105, 103, 106, 108, 110, 109, 112, 115, 113, 111, 114, 117, 120]
    market_data = {'close': pd.Series(close_prices)} # In a real app, 'source' would be specified

    # Add a 'source' key to indicator params for the simulation
    if strategy.get("condition", {}).get("inputs"):
        for i in strategy["condition"]["inputs"]:
            if i["type"] == "indicator":
                i["params"]["source"] = "close"

    while engine_state["is_running"]:
        result = execute_json_strategy(strategy, market_data)

        if result is True:
            print(f"--- STRATEGY CONDITION MET for {pair} ---")
        elif result is False:
            print(f"--- Strategy condition NOT met for {pair} ---")

        await asyncio.sleep(5) # Simulate 5-second interval

def start_engine_for_pair(pair: str, strategy: dict):
    """
    Starts the trading engine for a specific trading pair.
    """
    if pair in engine_state["tasks"]:
        print(f"Engine already running for {pair}.")
        return

    # Using the simulation loop for this sandboxed environment
    task = asyncio.create_task(_simulation_loop(pair, strategy))
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
