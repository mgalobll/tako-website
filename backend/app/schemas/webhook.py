from datetime import datetime
from typing import Any, Optional, Union

from pydantic import BaseModel, Field


class CalcomBookingAttendee(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    timeZone: Optional[str] = None


class CalcomBookingPayload(BaseModel):
    event: str = Field(..., examples=['BOOKING_CREATED'])
    booking_id: Optional[int] = Field(default=None, alias='bookingId')
    uid: Optional[str] = None
    title: Optional[str] = None
    start_time: Optional[datetime] = Field(default=None, alias='startTime')
    end_time: Optional[datetime] = Field(default=None, alias='endTime')
    attendees: list[CalcomBookingAttendee] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)


class CalcomWebhookEnvelope(BaseModel):
    triggerEvent: Optional[str] = None
    createdAt: Optional[datetime] = None
    payload: Union[CalcomBookingPayload, dict[str, Any]]
