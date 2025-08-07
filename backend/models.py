from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)
    pair = Column(String, index=True)
    side = Column(String)
    amount = Column(Float)
    entry_price = Column(Float)
    exit_price = Column(Float, nullable=True)
    pnl = Column(Float, nullable=True)
    start_time = Column(DateTime)
    end_time = Column(DateTime, nullable=True)
    leverage = Column(Float)
    fees = Column(Float, nullable=True)

class AppSettings(Base):
    __tablename__ = "app_settings"

    id = Column(Integer, primary_key=True)
    settings_json = Column(JSON)
