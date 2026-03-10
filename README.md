# Tako Therapist Website (Monorepo)

Production-oriented bilingual therapist website with a separated Next.js frontend and FastAPI backend.

## Project Structure

```
.
├── frontend/   # Next.js App Router, TypeScript, Tailwind
└── backend/    # FastAPI service for contact + webhooks + notification stubs
```

## Quick Start

1. Frontend setup:
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

2. Backend setup:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Frontend runs at `http://localhost:3000`, backend at `http://localhost:8000`.

## Integration

- Frontend uses `NEXT_PUBLIC_API_BASE_URL` for backend API calls.
- Contact form submits to `POST /api/contact`.
- Booking uses Cal.com links from frontend env vars.
- Backend webhook stub receives Cal.com events at `POST /api/webhooks/calcom`.

## Deployment

- Frontend: Vercel (set frontend env vars in project settings).
- Backend: Render/Railway/Fly.io (set backend env vars and run `uvicorn app.main:app --host 0.0.0.0 --port $PORT`).

See service-specific READMEs for details.
