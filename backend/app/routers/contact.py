import logging

from fastapi import APIRouter, Depends

from app.core.config import Settings, get_settings
from app.core.logging import log_event
from app.schemas.common import APIResponse
from app.schemas.contact import ContactSubmissionCreate
from app.services.contact_service import ContactService

router = APIRouter(prefix='/api', tags=['contact'])
logger = logging.getLogger(__name__)


@router.post('/contact', response_model=APIResponse)
def submit_contact(
    payload: ContactSubmissionCreate,
    settings: Settings = Depends(get_settings),
) -> APIResponse:
    service = ContactService(settings.contact_storage_file)
    service.save_submission(payload)

    log_event(
        logger,
        'contact.submission.received',
        email=payload.email,
        name=payload.name,
    )

    # TODO: invoke EmailNotificationService for admin alerts or autoresponders.

    return APIResponse(success=True, message='Contact request received successfully.')
