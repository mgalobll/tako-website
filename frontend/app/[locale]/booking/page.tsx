import { notFound } from 'next/navigation';
import BookingPanel from '@/components/BookingPanel';
import { getDictionary } from '@/config/locales';
import { isLocale } from '@/lib/i18n';

export default async function BookingPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = getDictionary(locale);

  return (
    <div className="-mt-2 space-y-2 pb-0">
      <h1 className="section-title">{t.booking.title}</h1>
      <p className="text-sm text-[#4a4039]">{t.booking.subtitle}</p>

      {status === 'success' && <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700">{t.booking.success}</p>}
      {status === 'error' && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{t.booking.error}</p>}

      <BookingPanel t={t} />
    </div>
  );
}
