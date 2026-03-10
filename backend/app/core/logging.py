import json
import logging
from datetime import datetime, timezone
from typing import Any


def setup_logging(level: str) -> None:
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format='%(message)s',
    )


def log_event(logger: logging.Logger, event: str, **payload: Any) -> None:
    record = {
        'ts': datetime.now(timezone.utc).isoformat(),
        'event': event,
        **payload,
    }
    logger.info(json.dumps(record, ensure_ascii=True))
