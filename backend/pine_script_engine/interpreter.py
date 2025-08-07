from .. import indicators
import pandas as pd

def execute_pine_script(parsed_calls: list, market_data: dict):
    """
    Executes the parsed Pine Script calls using the indicators library.
    """
    # Assuming market_data is a dictionary of pandas Series, e.g., {'close': pd.Series([...])}
    results = {}

    for call in parsed_calls:
        function_name = call["function"]
        args = call["args"]
        output_variable = call["output"]

        if hasattr(indicators, function_name):
            indicator_func = getattr(indicators, function_name)

            # Prepare arguments for the indicator function
            # This is a simplified mapping. A real implementation would be more robust.
            prepared_args = []
            for arg in args:
                if arg in market_data:
                    prepared_args.append(market_data[arg])
                else:
                    # Try to convert to int/float if possible
                    try:
                        prepared_args.append(int(arg))
                    except ValueError:
                        try:
                            prepared_args.append(float(arg))
                        except ValueError:
                            prepared_args.append(arg)

            # Execute the function
            result = indicator_func(*prepared_args)
            results[output_variable] = result
        else:
            print(f"Warning: Indicator '{function_name}' not found in the library.")

    return results
