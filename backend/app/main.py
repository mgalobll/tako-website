from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.logging import setup_logging
from app.routers.contact import router as contact_router
from app.routers.health import router as health_router
from app.routers.webhooks import router as webhook_router

settings = get_settings()
setup_logging(settings.log_level)

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'OPTIONS'],
    allow_headers=['*'],
)

app.include_router(health_router)
app.include_router(contact_router)
app.include_router(webhook_router)
