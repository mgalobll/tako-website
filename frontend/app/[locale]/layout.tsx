import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/config/locales';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { profile } from '@/config/profile';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const t = getDictionary(locale);

  return {
    title: {
      default: `${profile.name} | ${profile.title}`,
      template: `%s | ${profile.name}`
    },
    description: t.home.intro,
    alternates: {
      languages: {
        en: '/en',
        ka: '/ka'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <>
      <Navbar locale={typedLocale} />
      <main className="container-shell pt-10">{children}</main>
      <Footer locale={typedLocale} />
    </>
  );
}
