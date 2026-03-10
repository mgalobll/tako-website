from fastapi import APIRouter

from app.schemas.common import APIResponse

router = APIRouter(prefix='/api', tags=['health'])


@router.get('/health', response_model=APIResponse)
def health_check() -> APIResponse:
    return APIResponse(success=True, message='ok')
