from __future__ import annotations

from pydantic import BaseSettings


class Settings(BaseSettings):
    WEB_APP: str = 'app.main:app'
    WEB_PORT: int = 8100
    WEB_HOST: str = '0.0.0.0'

    INVENTORY_URL: str = 'http://localhost:8200/api'
    STORAGE_URL: str = 'http://localhost:8300/api'


def get_settings() -> Settings:
    return Settings()
