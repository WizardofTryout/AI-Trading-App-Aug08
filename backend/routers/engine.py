from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import trading_engine

router = APIRouter(
    prefix="/engine",
    tags=["engine"],
)

class StartRequest(BaseModel):
    strategies: dict[str, str] # e.g., {"BTCUSDT": "my_rsi = ta.rsi(close, 14)"}

@router.post("/start")
def start_engine(request: StartRequest):
    """
    Starts the trading engine with a given set of strategies.
    """
    try:
        trading_engine.start_all_engines(request.strategies)
        return {"message": "Trading engine started successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/stop")
def stop_engine():
    """
    Stops the trading engine.
    """
    try:
        trading_engine.stop_all_engines()
        return {"message": "Trading engine stopped successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status")
def get_engine_status():
    """
    Returns the current status of the trading engine.
    """
    return {"is_running": trading_engine.engine_state["is_running"]}
