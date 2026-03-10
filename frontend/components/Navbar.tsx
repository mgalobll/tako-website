import Link from 'next/link';
import { profile } from '@/config/profile';
import { getDictionary } from '@/config/locales';
import type { Locale } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

type Props = {
  locale: Locale;
};

export default function Navbar({ locale }: Props) {
  const t = getDictionary(locale);

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/booking`, label: t.nav.booking },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/contact`, label: t.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-accent/15 bg-base/95 backdrop-blur">
      <div className="container-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href={`/${locale}`} className="font-heading text-2xl font-semibold text-ink">
          {profile.name}
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-ink" aria-label="Main">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher currentLocale={locale} />
          <Link
            href={`/${locale}/booking`}
            className="rounded-full bg-accent px-4 py-2 font-semibold text-white transition hover:opacity-90"
          >
            {t.common.bookSession}
          </Link>
        </nav>
      </div>
    </header>
  );
}
