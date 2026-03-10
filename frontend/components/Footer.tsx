import Link from 'next/link';
import { contactInfo } from '@/config/contactInfo';
import { socialLinks } from '@/config/socialLinks';
import { getDictionary } from '@/config/locales';
import { profile } from '@/config/profile';
import type { Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-accent/20 bg-surface py-10">
      <div className="container-shell grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-heading text-2xl">{profile.name}</p>
          <p className="mt-2 text-sm text-[#6b5f57]">{contactInfo.email}</p>
          <p className="text-sm text-[#6b5f57]">{contactInfo.phone}</p>
        </div>
        <div className="flex gap-4 text-sm">
          <Link href={socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-accent">
            Instagram
          </Link>
          <Link href={socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-accent">
            Facebook
          </Link>
        </div>
        <div className="text-sm">
          <p>{t.footer.disclaimer}</p>
          <p className="mt-2 text-xs text-[#6b5f57]">
            &copy; {year} {profile.name}. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
