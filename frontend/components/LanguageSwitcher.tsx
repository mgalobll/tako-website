'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, type Locale } from '@/lib/i18n';

type Props = {
  currentLocale: Locale;
};

export default function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();

  const createPath = (nextLocale: Locale) => {
    if (!pathname) return `/${nextLocale}`;
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = nextLocale;
    return `/${segments.join('/')}`;
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-accent/25 bg-white/70 p-1" aria-label="Language switcher">
      {locales.map((locale) => {
        const active = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={createPath(locale)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition ${
              active ? 'bg-accent text-white' : 'text-ink hover:bg-accentSoft'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
