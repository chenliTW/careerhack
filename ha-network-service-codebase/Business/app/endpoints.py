from __future__ import annotations

import logging

import requests
from app.repository import Repository
from app.repository import RestRepository
from app.schema import Inventory
from app.schema import order_to_record
from app.schema import Orders
from app.schema import Record
from app.schema import Report
from app.schema import Result
from app.settings import get_settings
from app.settings import Settings
from fastapi import FastAPI


logger: logging.Logger = logging.getLogger(__name__)

settings: Settings = get_settings()

app: FastAPI = FastAPI()

URL_MATERIAL: str = f'{settings.INVENTORY_URL}/material'

repository: Repository = RestRepository()


@app.post('/order')
def order(orders: Orders) -> Result:
    response = requests.post(url=URL_MATERIAL, json=orders.data.dict())
    inventory: Inventory = Inventory(**response.json())
    record: Record = order_to_record(orders)
    record.material = inventory.material
    record.signature = inventory.signature
    return repository.save(record=record)


@app.get('/record')
def query(location: str, date: str) -> list[Record]:
    return repository.query(location=location, date=date)


@app.post('/report')
def report(location: str, date: str) -> Report:
    return repository.report(location=location, date=date)
