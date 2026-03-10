# Backend (FastAPI)

FastAPI backend service for contact form handling, Cal.com webhooks, and future notification workflows.

## Features

- Modular structure: routers, schemas, services, config
- Endpoints:
  - `GET /api/health`
  - `POST /api/contact`
  - `POST /api/webhooks/calcom`
- Input validation with Pydantic
- Environment-based configuration
- CORS for frontend domain(s)
- Structured logging
- Notification service abstractions (email/SMS stubs)

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

## Environment Variables

See `.env.example`:

- `APP_NAME`
- `ENVIRONMENT` (`development` or `production`)
- `LOG_LEVEL`
- `ALLOWED_ORIGINS` (comma-separated frontend URLs)
- `CALCOM_WEBHOOK_SECRET`
- `CONTACT_STORAGE_FILE`

## API Notes

### `POST /api/contact`

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+995555123456",
  "message": "I would like to book an initial consultation."
}
```

Stores submissions in JSONL (`CONTACT_STORAGE_FILE`) as a placeholder storage layer.

### `POST /api/webhooks/calcom`

- Accepts Cal.com event payloads.
- In non-development environments, signature verification is enforced.
- Logs booking metadata and payload snapshot.
- Includes TODO points for future notification logic.

## Notification Extension Points

- `app/services/notification_service.py`
  - `EmailNotificationService`
  - `SMSNotificationService`

Suggested future triggers:
- booking request received
- booking confirmed
- reminder notifications

## Deploy to Render/Railway/Fly.io

Run command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Set env vars from `.env.example`, especially:
- `ALLOWED_ORIGINS`
- `CALCOM_WEBHOOK_SECRET`
