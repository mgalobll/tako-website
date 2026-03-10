import hmac
import hashlib
import json
import logging
from typing import Any, Optional

from app.core.logging import log_event

logger = logging.getLogger(__name__)


def verify_calcom_signature(raw_body: bytes, signature: Optional[str], secret: str) -> bool:
    if not signature or not secret:
        return False

    expected = hmac.new(secret.encode('utf-8'), raw_body, hashlib.sha256).hexdigest()
    provided = signature.replace('sha256=', '').strip()
    return hmac.compare_digest(expected, provided)


def parse_webhook_payload(data: dict[str, Any]) -> tuple[str, dict[str, Any]]:
    event_name = data.get('triggerEvent') or data.get('event') or 'UNKNOWN_EVENT'
    payload = data.get('payload') if isinstance(data.get('payload'), dict) else data
    return event_name, payload


def log_booking_event(event_name: str, payload: dict[str, Any]) -> None:
    attendees = payload.get('attendees') or []
    attendee_emails = [attendee.get('email') for attendee in attendees if isinstance(attendee, dict)]

    log_event(
        logger,
        'calcom.webhook.received',
        event_name=event_name,
        booking_id=payload.get('bookingId') or payload.get('booking_id'),
        uid=payload.get('uid'),
        start_time=payload.get('startTime') or payload.get('start_time'),
        attendee_emails=attendee_emails,
    )

    # TODO: Future custom notification flow can branch on event_name:
    # - BOOKING_CREATED: send booking received/confirmed notifications.
    # - BOOKING_CANCELLED: send cancellation notification.
    # - Pre-session scheduler: trigger reminder notifications.

    log_event(logger, 'calcom.webhook.payload.snapshot', payload=json.dumps(payload, ensure_ascii=True))
