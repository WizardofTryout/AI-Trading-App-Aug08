from fastapi import FastAPI
from .database import engine
from . import models
from .routers import settings, trades

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(settings.router)
app.include_router(trades.router)

@app.get("/")
def read_root():
    return {"message": "AI Trading App Backend is running"}
