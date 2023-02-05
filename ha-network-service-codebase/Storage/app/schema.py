from __future__ import annotations

from pydantic import BaseModel
from pydantic import Field


class Result(BaseModel):
    success: bool = Field(default=True)

    @staticmethod
    def ok() -> Result:
        return Result(success=True)

    @staticmethod
    def failed() -> Result:
        return Result(success=False)


class Record(BaseModel):
    location: str = Field(default='l1')
    timestamp: str = Field(example='2023-01-01T00:00:00+08:00')
    signature: str = Field(default='')
    material: float = Field(default=0.0)
    a: float = Field(default=0.0)
    b: float = Field(default=0.0)
    c: float = Field(default=0.0)
    d: float = Field(default=0.0)


class Report(BaseModel):
    location: str = Field(default='l1')
    date: str = Field(example='2023-01-01')

    count: int = Field(default=0)
    material: float = Field(default=0.0)
    a: float = Field(default=0.0)
    b: float = Field(default=0.0)
    c: float = Field(default=0.0)
    d: float = Field(default=0.0)
