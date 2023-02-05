from __future__ import annotations

import base64
import logging

from app.schema import Data
from app.schema import Inventory
from app.settings import get_settings
from app.settings import Settings
from fastapi import FastAPI


logger: logging.Logger = logging.getLogger(__name__)

settings: Settings = get_settings()

app: FastAPI = FastAPI()


@app.post('/material')
def material(data: Data) -> Inventory:
    try:
        material: int = 0
        total: int = 0
        for item, count in data.dict().items():
            material += settings.FORMULA.get(item)*count
            total += count
        return Inventory(material=material, signature=_signature(int(total)))
    except Exception as error:
        logger.exception(error)
    return Inventory(material=0, signature=_signature(0))


def _signature(total: int) -> str:
    return base64.b64encode(str(total).encode('UTF-8')).decode('UTF-8')
