from fastapi import FastAPI
from database import engine
import models
from routers import settings, trades, strategy
from routers import engine as engine_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(settings.router)
app.include_router(trades.router)
app.include_router(strategy.router)
app.include_router(engine_router.router)

@app.get("/")
def read_root():
    return {"message": "AI Trading App Backend is running"}
