from __future__ import annotations

from pydantic import BaseModel
from pydantic import Field


class Inventory(BaseModel):
    signature: str = Field(default='')
    material: float = Field(default=0.0)


class Data(BaseModel):
    a: float = Field(default=0.0)
    b: float = Field(default=0.0)
    c: float = Field(default=0.0)
    d: float = Field(default=0.0)
