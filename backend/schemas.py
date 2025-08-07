from pydantic import BaseModel
from datetime import datetime

class SettingBase(BaseModel):
    key: str
    value: str

class SettingCreate(SettingBase):
    pass

class Setting(SettingBase):
    id: int

    class Config:
        orm_mode = True

class TradeBase(BaseModel):
    pair: str
    side: str
    amount: float
    entry_price: float
    exit_price: float | None = None
    pnl: float | None = None
    start_time: datetime
    end_time: datetime | None = None
    leverage: float
    fees: float | None = None

class TradeCreate(TradeBase):
    pass

class Trade(TradeBase):
    id: int

    class Config:
        orm_mode = True
