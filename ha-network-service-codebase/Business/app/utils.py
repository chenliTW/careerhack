from __future__ import annotations

from datetime import datetime
from datetime import timedelta
from datetime import timezone


def get_isoformat(zone: timezone = timezone(timedelta(hours=+8))) -> str:
    return datetime.now(zone).isoformat(timespec='milliseconds')
