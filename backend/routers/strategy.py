from fastapi import APIRouter
from pydantic import BaseModel
from ..pine_script_engine import parser, interpreter
import pandas as pd

router = APIRouter(
    prefix="/strategy",
    tags=["strategy"],
)

class StrategyExecutionRequest(BaseModel):
    script: str
    market_data: dict[str, list]

@router.post("/execute")
def execute_strategy(request: StrategyExecutionRequest):
    """
    Executes a Pine Script strategy against the provided market data.
    """
    # Convert market data lists to pandas Series
    market_data_pd = {k: pd.Series(v) for k, v in request.market_data.items()}

    # Parse the script
    parsed_calls = parser.parse_pine_script(request.script)

    # Execute the script
    results = interpreter.execute_pine_script(parsed_calls, market_data_pd)

    # Convert pandas Series results to list for JSON response
    json_results = {k: v.tolist() if isinstance(v, pd.Series) else v for k, v in results.items()}

    return json_results
