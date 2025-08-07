from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/settings",
    tags=["settings"],
)

@router.get("/", response_model=list[schemas.Setting])
def read_settings(db: Session = Depends(get_db)):
    settings = db.query(models.Setting).all()
    return settings

@router.post("/", response_model=schemas.Setting)
def create_setting(setting: schemas.SettingCreate, db: Session = Depends(get_db)):
    db_setting = models.Setting(**setting.dict())
    db.add(db_setting)
    db.commit()
    db.refresh(db_setting)
    return db_setting
