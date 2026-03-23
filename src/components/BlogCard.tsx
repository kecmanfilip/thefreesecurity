import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  coverImage?: string;
}

function formatDate(dateStr: string, lang: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'sr-Latn-RS', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function BlogCard({ title, excerpt, date, author, slug, coverImage }: BlogCardProps) {
  const { t, i18n } = useTranslation();

  return (
    <article className="glass-card overflow-hidden hover:bg-white/8 transition-all duration-300 group">
      {/* Cover image */}
      <div className="aspect-video bg-navy-700 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width="600"
            height="338"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-700 to-navy-800">
            <span className="text-blue-brand/30 text-6xl font-bold">TFS</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} aria-hidden="true" />
            <time dateTime={date}>{formatDate(date, i18n.language)}</time>
          </span>
          <span className="flex items-center gap-1">
            <User size={12} aria-hidden="true" />
            {author}
          </span>
        </div>

        <h2 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-bright transition-colors">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h2>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        <Link
          to={`/blog/${slug}`}
          className="text-blue-bright text-sm font-medium hover:text-white transition-colors"
          aria-label={`${t('blog.readMore')}: ${title}`}
        >
          {t('blog.readMore')} →
        </Link>
      </div>
    </article>
  );
}
