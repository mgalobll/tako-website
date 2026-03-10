import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import { getDictionary } from '@/config/locales';
import { contactInfo } from '@/config/contactInfo';
import { socialLinks } from '@/config/socialLinks';
import { isLocale } from '@/lib/i18n';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = getDictionary(locale);

  return (
    <div className="space-y-6 pb-10">
      <h1 className="section-title">{t.contact.title}</h1>
      <p className="text-[#6b5f57]">{t.contact.subtitle}</p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-3 p-6">
          <p>
            <strong>Email:</strong> {contactInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {contactInfo.phone}
          </p>
          <p>
            <strong>Address:</strong> {contactInfo.address[locale]}
          </p>
          <p>
            <strong>Instagram:</strong>{' '}
            <Link
              className="inline-flex rounded-full border border-accent/35 px-3 py-1 text-sm font-semibold text-accent hover:bg-accent/10"
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
            >
              {socialLinks.instagramLabel}
            </Link>
          </p>
          <p>
            <strong>Facebook:</strong>{' '}
            <Link
              className="inline-flex rounded-full border border-accent/35 px-3 py-1 text-sm font-semibold text-accent hover:bg-accent/10"
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
            >
              {socialLinks.facebookLabel}
            </Link>
          </p>
        </div>

        <ContactForm t={t} />
      </div>
    </div>
  );
}
