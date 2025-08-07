from fastapi import APIRouter, Depends
from pydantic import BaseModel
from pine_script_engine import parser, interpreter
import pandas as pd
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

router = APIRouter(
    prefix="/strategy",
    tags=["strategy"],
)

class StrategyExecutionRequest(BaseModel):
    script: str
    market_data: dict[str, list]

# This is a placeholder for a more robust strategy model
class VisualStrategy(BaseModel):
    name: str
    strategy_json: dict

@router.post("/visual")
def save_visual_strategy(strategy: VisualStrategy, db: Session = Depends(get_db)):
    # In a real app, you'd save this to a new 'strategies' table
    print(f"Saving visual strategy '{strategy.name}': {strategy.strategy_json}")
    return {"message": "Strategy saved successfully"}

@router.get("/visual/{name}")
def get_visual_strategy(name: str, db: Session = Depends(get_db)):
    # In a real app, you'd fetch this from the database
    print(f"Fetching visual strategy '{name}'")
    return {"name": name, "strategy_json": {}}


@router.post("/execute")
def execute_strategy(request: StrategyExecutionRequest):
    """
    Executes a Pine Script strategy against the provided market data.
    """
    # Convert market data lists to pandas Series
    market_data_pd = {k: pd.Series(v) for k, v in request.market_data.items()}

    # Parse the script
    parsed_script = parser.parse_pine_script(request.script)

    # Execute the script
    results = interpreter.execute_pine_script(parsed_script, market_data_pd)

    # Sanitize results to ensure they are JSON-serializable
    sanitized_results = {k: bool(v) if isinstance(v, (bool)) else v for k, v in results.items()}

    return sanitized_results
