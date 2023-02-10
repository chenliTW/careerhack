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

program_cache={}

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
    rep_len=r.llen(location+date)
    
    old_cache_len=r.get(location+date+"len")
    if old_cache_len is not None:
        cache = r.get(location+date+str(rep_len))
        if cache is not None:
            #print("cache hit")
            return pickle.loads(cache)
        else:
            old_cache=r.get(location+date+str(old_cache_len.decode()))
            #print(old_cache,location+date+str(old_cache_len))
            if old_cache is not None:
                new_datas=r.lrange(location+date, int(old_cache_len)+1, -1)
                cache = pickle.loads(old_cache)
                for data in new_datas:
                    record = pickle.loads(data)
                    cache.a += record.a
                    cache.b += record.b
                    cache.c += record.c
                    cache.d += record.d
                    cache.material += record.material
                    cache.count += 1
                r.set(location+date+"len",cache.count)
                r.set(location+date+str(cache.count),pickle.dumps(cache))
                return cache
    
    data_list = query(location=location, date=date)
    report: Report = Report(location=location, date=date)
    report.count = len(data_list)
    report.a = sum(r.a for r in data_list)
    report.b = sum(r.b for r in data_list)
    report.c = sum(r.c for r in data_list)
    report.d = sum(r.d for r in data_list)
    report.material = sum(r.material for r in data_list)
    #if location+date+"len" in program_cache:
    #    old_cache_len = program_cache[location+date+"len"]
    #    del program_cache[location+date+"len"]
    #    del program_cache[location+date+str(old_cache_len)]

    r.set(location+date+"len",report.count)
    r.set(location+date+str(report.count),pickle.dumps(report))
    return report


@app.post('/clean')
def clean() -> Result:
    keys = r.keys('*')
    r.delete(*keys)
    return Result.ok()
