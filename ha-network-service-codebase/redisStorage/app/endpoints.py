from __future__ import annotations

import logging
from collections import defaultdict

from app.schema import Record
from app.schema import Report
from app.schema import Result
from app.settings import get_settings
from app.settings import Settings
from fastapi import FastAPI
from redis.sentinel import Sentinel
import pickle

logger: logging.Logger = logging.getLogger(__name__)

settings: Settings = get_settings()

app: FastAPI = FastAPI()

CACHE: dict[
    str, dict[str, list[Record]],
] = defaultdict(lambda: defaultdict(list))

sentinel = Sentinel([('redis-redis-ha.default.svc.cluster.local', 26379)])
r = sentinel.master_for('mymaster')

@app.post('/records')
def save(record: Record) -> Result:
    #location_dict = CACHE[record.location]
    #records = location_dict[record.timestamp[0:10]]  # datetime to date
    r.rpush(record.location+record.timestamp[0:10],pickle.dumps(record))
    return Result.ok()


@app.get('/records')
def query(location: str, date: str) -> list[Record]:
    #if location_dict := CACHE.get(location):
    #    return location_dict.get(date)
    datas=r.lrange(location+date, 0, -1)
    return [ pickle.loads(data) for data in datas]


@app.get('/report')
def report(location: str, date: str) -> Report:
    data_list = query(location=location, date=date)
    report: Report = Report(location=location, date=date)
    report.count = len(data_list)
    report.a = sum(r.a for r in data_list)
    report.b = sum(r.b for r in data_list)
    report.c = sum(r.c for r in data_list)
    report.d = sum(r.d for r in data_list)
    return report


@app.post('/clean')
def clean() -> Result:
    keys = r.keys('*')
    r.delete(*keys)
    return Result.ok()
