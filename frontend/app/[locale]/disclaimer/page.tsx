import { notFound } from 'next/navigation';
import { getDictionary } from '@/config/locales';
import { isLocale } from '@/lib/i18n';

export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = getDictionary(locale);

  return (
    <article className="card max-w-3xl space-y-4 p-6 pb-10">
      <h1 className="section-title">{t.disclaimer.title}</h1>
      <p className="text-[#6b5f57]">{t.disclaimer.content}</p>
    </article>
  );
}
