import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/config/blogPosts';
import { getDictionary } from '@/config/locales';
import { socialLinks } from '@/config/socialLinks';
import { isLocale } from '@/lib/i18n';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = getDictionary(locale);

  return (
    <div className="space-y-6 pb-10">
      <h1 className="section-title">{t.blog.title}</h1>
      <p className="text-[#6b5f57]">{t.blog.subtitle}</p>

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <article key={post.slug} className="card p-6">
            <p className="text-xs uppercase tracking-wide text-accent">{post.date}</p>
            <h2 className="mt-2 font-heading text-3xl">{post.title[locale]}</h2>
            <p className="mt-2 text-[#6b5f57]">{post.excerpt[locale]}</p>
          </article>
        ))}
      </div>

      <section className="card p-6">
        <h2 className="font-heading text-2xl">Instagram</h2>
        <p className="mt-2 text-[#6b5f57]">{t.blog.followInstagram}</p>
        <Link
          href={socialLinks.instagram}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full border border-accent/35 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent/10"
        >
          {socialLinks.instagramLabel}
        </Link>
      </section>
    </div>
  );
}
