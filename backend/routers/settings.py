from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
import json

router = APIRouter(
    prefix="/settings",
    tags=["settings"],
)

# In a real app, use a proper secret management solution
SECRET_KEY = "your-super-secret-key"

def encrypt_api_keys(settings: schemas.AppSettings) -> dict:
    """Placeholder for encryption logic."""
    encrypted_settings = settings.dict()
    # Example:
    # if encrypted_settings.get("bitget_api_key"):
    #     encrypted_settings["bitget_api_key"] = f"encrypted_{encrypted_settings['bitget_api_key']}"
    return encrypted_settings

def decrypt_api_keys(settings: dict) -> dict:
    """Placeholder for decryption logic."""
    decrypted_settings = settings.copy()
    # Example:
    # if decrypted_settings.get("bitget_api_key"):
    #     decrypted_settings["bitget_api_key"] = decrypted_settings["bitget_api_key"].replace("encrypted_", "")
    return decrypted_settings


@router.get("/", response_model=schemas.AppSettings)
def get_settings(db: Session = Depends(get_db)):
    """
    Retrieve the application settings. There is only one settings entry.
    """
    settings_model = db.query(models.AppSettings).first()
    if not settings_model:
        # If no settings exist, create a default entry
        default_settings = models.AppSettings(id=1, settings_json={})
        db.add(default_settings)
        db.commit()
        db.refresh(default_settings)
        settings_model = default_settings

    decrypted_data = decrypt_api_keys(settings_model.settings_json)
    return decrypted_data

@router.post("/", response_model=schemas.AppSettings)
def save_settings(settings: schemas.AppSettings, db: Session = Depends(get_db)):
    """
    Update the application settings.
    """
    db_settings = db.query(models.AppSettings).first()
    if not db_settings:
        db_settings = models.AppSettings(id=1)
        db.add(db_settings)

    encrypted_data = encrypt_api_keys(settings)
    db_settings.settings_json = encrypted_data

    db.commit()
    db.refresh(db_settings)

    decrypted_data = decrypt_api_keys(db_settings.settings_json)
    return decrypted_data
