from __future__ import annotations

import logging
from collections import defaultdict

from app.schema import Record
from app.schema import Report
from app.schema import Result
from app.settings import get_settings
from app.settings import Settings
from fastapi import FastAPI
import pymongo

logger: logging.Logger = logging.getLogger(__name__)

settings: Settings = get_settings()

app: FastAPI = FastAPI()

CACHE: dict[
    str, dict[str, list[Record]],
] = defaultdict(lambda: defaultdict(list))

client = pymongo.MongoClient('mongodb+srv://mongodb:mongodb@mongodb-svc.default.svc.cluster.local/?replicaSet=mongodb&ssl=false')
#client = pymongo.MongoClient('mongodb://root:zAfHiERbzQ@192.168.100.205:27017/?authMechanism=DEFAULT')
db = client["db"]
col = db["records"]
pre = db["reports"]

@app.post('/records')
def save(record: Record) -> Result:
    #location_dict = CACHE[record.location]
    #records = location_dict[record.timestamp[0:10]]  # datetime to date
    #records.append(record)
    col.insert_one(record.dict())
    return Result.ok()


@app.get('/records')
def query(location: str, date: str) -> list[Record]:
    #if location_dict := CACHE.get(location):
    #    return location_dict.get(date)
     #return []
    records=col.find({ "location": location , "timestamp": { "$regex": "^" + date } })
    return [ Record(**record) for record in records]


@app.get('/report')
def report(location: str, date: str) -> Report:
    reports = pre.find({ "location": location , "date": date })
    reports = [ Report(**report) for report in reports]
    if len(reports) == 0:
        data_list = query(location=location, date=date)
        report: Report = Report(location=location, date=date)
        report.count = len(data_list)
        report.a = sum(r.a for r in data_list)
        report.b = sum(r.b for r in data_list)
        report.c = sum(r.c for r in data_list)
        report.d = sum(r.d for r in data_list)
        pre.insert_one(report.dict())
        return report
    else:
        return reports[0]


@app.post('/clean')
def clean() -> Result:
    #CACHE.clear()
    col.delete_many({})
    pre.delete_many({})
    return Result.ok()

@app.get("/health")
def health():
    return {"status": "ok"}