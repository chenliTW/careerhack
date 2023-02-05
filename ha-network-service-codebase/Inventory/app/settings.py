from __future__ import annotations

from pydantic import BaseSettings


class Settings(BaseSettings):
    WEB_APP: str = 'app.main:app'
    WEB_PORT: int = 8200
    WEB_HOST: str = '0.0.0.0'
    FORMULA = {'a': 3, 'b': 2, 'c': 4, 'd': 10}


def get_settings() -> Settings:
    return Settings()
