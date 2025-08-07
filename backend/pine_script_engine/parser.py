import re

def parse_pine_script(script: str):
    """
    A simple parser for a subset of Pine Script using regular expressions.
    This parser identifies function calls like `ta.rsi(close, 14)`.
    """
    # Regex to find patterns like `variable = ta.indicator(param1, param2, ...)`
    pattern = re.compile(r"(\w+)\s*=\s*ta\.(\w+)\((.*?)\)")
    matches = pattern.findall(script)

    parsed_calls = []
    for match in matches:
        output_variable, function_name, args_str = match
        # Split arguments, stripping whitespace
        args = [arg.strip() for arg in args_str.split(',')]

        parsed_calls.append({
            "output": output_variable,
            "function": function_name,
            "args": args
        })

    return parsed_calls
