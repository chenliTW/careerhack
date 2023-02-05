from __future__ import annotations

import uvicorn
from app import endpoints
from app.settings import get_settings
from app.settings import Settings
from fastapi import FastAPI

settings: Settings = get_settings()


def build_app() -> FastAPI:

    api = FastAPI(docs_url=None)
    api.mount('/api', endpoints.app)

    return api


app = build_app()

if __name__ == '__main__':
    uvicorn.run(
        app=settings.WEB_APP,
        host=settings.WEB_HOST,
        port=settings.WEB_PORT,
        reload=True,
        log_config='logging.yaml',
    )
