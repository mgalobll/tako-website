# Frontend (Next.js)

Bilingual therapist website frontend using Next.js App Router + TypeScript + Tailwind.

## Features

- Route-based locales: `/en` and `/ka`
- Language switcher in navbar
- Pages: Home (combined profile/about), Booking, Blog/Insights, Contact, Privacy, Disclaimer
- Legacy routes `/about` and `/services` redirect to Home
- Calm and warm responsive design
- SEO basics: metadata, `sitemap.xml`, `robots.txt`
- Contact form integration with FastAPI backend
- Cal.com booking integration (embed or redirect mode)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL`: frontend public URL
- `NEXT_PUBLIC_API_BASE_URL`: backend base URL (e.g. `https://api.example.com`)
- `NEXT_PUBLIC_CAL_BOOKING_MODE`: `redirect` or `embed`
- `NEXT_PUBLIC_CAL_ORIGIN`: Cal origin (e.g. `https://app.cal.eu`)
- `NEXT_PUBLIC_CAL_NAMESPACE`: embed namespace
- `NEXT_PUBLIC_CAL_INPERSON_LINK`: in-person Cal link slug
- `NEXT_PUBLIC_INSTAGRAM_URL`: Instagram profile URL

## Content Editing

All editable content lives in `config/`:

- `config/profile.ts`: therapist profile, biography, education, experience, philosophy
- `config/contactInfo.ts`: email/phone/address
- `config/socialLinks.ts`: social URLs
- `config/blogPosts.ts`: internal blog/insights cards
- `config/locales/en.ts` and `config/locales/ka.ts`: translations

## Cal.com Integration

1. Create your in-person Cal.com event type.
2. Set:
   - `NEXT_PUBLIC_CAL_ORIGIN`
   - `NEXT_PUBLIC_CAL_NAMESPACE`
   - `NEXT_PUBLIC_CAL_INPERSON_LINK`
3. Choose mode:
   - `NEXT_PUBLIC_CAL_BOOKING_MODE=redirect` (recommended)
   - `NEXT_PUBLIC_CAL_BOOKING_MODE=embed`
4. In Cal.com event settings, add booking intake questions for:
   - name
   - email
   - phone
   - reason for inquiry

## Therapist Photo

Replace `/public/profile-placeholder.jpg` with the real profile image (same filename) or update the path in `config/profile.ts`.

## Deploy to Vercel

1. Push repository to Git provider.
2. Import project in Vercel and set root directory to `frontend`.
3. Configure env vars from `.env.example`.
4. Deploy.
