from __future__ import annotations

import logging
from abc import ABC
from abc import abstractmethod

import requests
from app.schema import Record
from app.schema import Report
from app.schema import Result
from app.settings import get_settings
from app.settings import Settings


logger: logging.Logger = logging.getLogger(__name__)

settings: Settings = get_settings()


class Repository(ABC):
    @abstractmethod
    def save(self, record: Record) -> bool:
        raise NotImplementedError()

    @abstractmethod
    def query(self, location: str, date: str) -> list[Record]:
        raise NotImplementedError()

    @abstractmethod
    def report(self, location: str, date: str) -> Report:
        raise NotImplementedError()

    @abstractmethod
    def truth(self, record: Record) -> bool:
        raise NotImplementedError()

URL_SAVE_RECORD: str = f'{settings.STORAGE_URL}/records'


class RestRepository(Repository):

    def save(self, record: Record) -> bool:
        response = requests.post(url=URL_SAVE_RECORD, json=record.dict())
        #while True:
        #    try:
        #        response = requests.post(url=URL_SAVE_RECORD, json=record.dict())
        #    except requests.exceptions.ConnectionError:
        #        continue
        #    break
        return Result(**response.json())

    def query(self, location: str, date: str) -> list[Record]:
        url = f'{settings.STORAGE_URL}/records?location={location}&date={date}'
        return requests.get(url=url).json()
        #while True:
        #    try:
        #        return requests.get(url=url).json()
        #    except requests.exceptions.ConnectionError:
        #        continue
        #    break

    def report(self, location: str, date: str) -> Report:
        url = f'{settings.STORAGE_URL}/report?location={location}&date={date}'
        return Report(**requests.get(url=url).json())
        #while True:
        #    try:
        #        return Report(**requests.get(url=url).json())
        #    except requests.exceptions.ConnectionError:
        #        continue
        #    break

    def truth(self, record: Record) -> bool:
        url = f'{settings.STORAGE_URL}/truth'
        response = requests.post(url=url, json=record.dict())
        #while True:
        #    try:
        #        response = requests.post(url=url, json=record.dict())
        #    except requests.exceptions.ConnectionError:
        #        continue
        #    break
        return Result(**response.json())
