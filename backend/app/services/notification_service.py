import logging

from app.core.logging import log_event

logger = logging.getLogger(__name__)


class EmailNotificationService:
    """Placeholder abstraction for future email provider integration (e.g., Resend)."""

    def send_booking_received(self, recipient: str, context: dict) -> None:
        # TODO: Trigger when booking request is received.
        log_event(logger, 'email.booking_received.placeholder', recipient=recipient, context=context)

    def send_booking_confirmed(self, recipient: str, context: dict) -> None:
        # TODO: Trigger when booking is confirmed.
        log_event(logger, 'email.booking_confirmed.placeholder', recipient=recipient, context=context)


class SMSNotificationService:
    """Placeholder abstraction for future SMS provider integration (e.g., Twilio)."""

    def send_reminder(self, phone: str, context: dict) -> None:
        # TODO: Trigger reminder notifications before scheduled sessions.
        log_event(logger, 'sms.booking_reminder.placeholder', phone=phone, context=context)
