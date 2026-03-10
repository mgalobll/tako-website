import logging
from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status

from app.core.config import Settings, get_settings
from app.schemas.common import APIResponse
from app.services.webhook_service import (
    log_booking_event,
    parse_webhook_payload,
    verify_calcom_signature,
)

router = APIRouter(prefix='/api/webhooks', tags=['webhooks'])
logger = logging.getLogger(__name__)


@router.post('/calcom', response_model=APIResponse)
async def calcom_webhook(
    request: Request,
    settings: Settings = Depends(get_settings),
    x_cal_signature_256: Optional[str] = Header(default=None, alias='X-Cal-Signature-256'),
    x_cal_signature: Optional[str] = Header(default=None, alias='X-Cal-Signature'),
) -> APIResponse:
    raw_body = await request.body()

    signature = x_cal_signature_256 or x_cal_signature
    if settings.environment != 'development':
        if not verify_calcom_signature(raw_body, signature, settings.calcom_webhook_secret):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Invalid webhook signature',
            )

    body = await request.json()
    event_name, payload = parse_webhook_payload(body)
    log_booking_event(event_name, payload)

    return APIResponse(success=True, message='Webhook accepted.')
