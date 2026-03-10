import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/config/locales';
import { profile } from '@/config/profile';
import { isLocale } from '@/lib/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = getDictionary(locale);

  return (
    <div className="space-y-14 pb-10">
      <section className="reveal grid items-center gap-8 rounded-2xl bg-surface p-8 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="section-title text-ink">{profile.name}</h1>
          <p className="text-lg text-accent">{profile.title}</p>
          <p className="text-base text-ink">{t.home.welcome}</p>
          <p className="text-base text-ink">{t.home.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/booking`} className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">
              {t.common.bookSession}
            </Link>
            <Link href={`/${locale}/contact`} className="rounded-full border border-accent/40 px-5 py-2.5 text-sm font-semibold">
              {t.common.contactUs}
            </Link>
          </div>
        </div>
        <div className="card overflow-hidden p-0">
          <div className="flex aspect-[4/5] items-center justify-center bg-accentSoft/40 text-sm text-[#6b5f57]">
            Add therapist photo in /public/profile-placeholder.jpg
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card p-6">
          <h2 className="font-heading text-3xl">{t.home.approachTitle}</h2>
          <p className="mt-3 text-[#6b5f57]">{t.home.approachText}</p>
        </article>
        <article className="card p-6">
          <h2 className="font-heading text-3xl">{t.home.expertiseTitle}</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[#6b5f57]">
            {profile.focusAreas[locale].map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">{t.about.title}</h2>
        <article className="card p-6">
          <h3 className="font-heading text-2xl">{t.about.biography}</h3>
          <p className="mt-2 text-[#6b5f57]">{profile.biography[locale]}</p>
        </article>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="card p-6">
            <h3 className="font-heading text-2xl">{t.about.education}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[#6b5f57]">
              {profile.education[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card p-6">
            <h3 className="font-heading text-2xl">{t.about.experience}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[#6b5f57]">
              {profile.experience[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <article className="card p-6">
          <h3 className="font-heading text-2xl">{t.about.philosophy}</h3>
          <p className="mt-2 text-[#6b5f57]">{profile.philosophy[locale]}</p>
        </article>
      </section>
    </div>
  );
}
