from pydantic import BaseModel
from datetime import datetime

class AppSettings(BaseModel):
    bitget_api_key: str | None = None
    binance_api_key: str | None = None
    ai_api_key: str | None = None
    ollama_url: str | None = None
    investment_per_trade: float | None = None
    risk_reward_ratio: str | None = None
    stop_loss: float | None = None
    take_profit: float | None = None
    trade_direction: str | None = None
    leverage: float | None = None

    class Config:
        from_attributes = True

class TradeBase(BaseModel):
    pair: str
    side: str
    amount: float
    entryPrice: float
    exitPrice: float | None = None
    pnl: float | None = None
    startTime: int  # Unix timestamp
    endTime: int | None = None
    leverage: float
    fees: float | None = None

class TradeCreate(TradeBase):
    pass

class Trade(TradeBase):
    id: int

    class Config:
        from_attributes = True
