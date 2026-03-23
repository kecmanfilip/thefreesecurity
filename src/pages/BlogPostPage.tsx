import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema, makeBlogPostSchema } from '../components/JsonLd';
import posts from '../utils/blogPosts';

function applyInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-navy-800 text-blue-bright px-1.5 py-0.5 rounded text-sm font-mono border border-white/10">$1</code>');
}

function renderMarkdown(md: string): string {
  // Ensure headings separated from following text by only \n get a blank line
  const normalized = md.replace(/(#{1,3}[^\n]+)\n([^#\n])/g, '$1\n\n$2');

  const blocks = normalized.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const output: string[] = [];
  let listBuf: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (!listBuf) return;
    const tag = listBuf.ordered ? 'ol' : 'ul';
    const cls = listBuf.ordered
      ? 'list-decimal list-outside ml-6 space-y-2 text-slate-300 mt-4 mb-6'
      : 'list-disc list-outside ml-6 space-y-2 text-slate-300 mt-4 mb-6';
    output.push(
      `<${tag} class="${cls}">${listBuf.items
        .map((i) => `<li class="pl-1 leading-relaxed">${applyInline(i)}</li>`)
        .join('')}</${tag}>`
    );
    listBuf = null;
  };

  for (const block of blocks) {
    if (block.startsWith('### ')) {
      flushList();
      output.push(`<h3 class="text-xl font-bold text-white mt-8 mb-3">${applyInline(block.slice(4))}</h3>`);
      continue;
    }
    if (block.startsWith('## ')) {
      flushList();
      output.push(`<h2 class="text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-white/10">${applyInline(block.slice(3))}</h2>`);
      continue;
    }
    if (block.startsWith('# ')) {
      flushList();
      output.push(`<h2 class="text-3xl font-bold text-white mt-10 mb-4">${applyInline(block.slice(2))}</h2>`);
      continue;
    }
    if (/^---+$/.test(block)) {
      flushList();
      output.push('<hr class="border-white/10 my-8" />');
      continue;
    }
    if (block.startsWith('> ')) {
      flushList();
      const content = block.split('\n').map((l) => l.replace(/^>\s?/, '')).join(' ');
      output.push(`<blockquote class="border-l-4 border-blue-brand pl-5 my-5 text-slate-300 italic">${applyInline(content)}</blockquote>`);
      continue;
    }

    // Single list item — buffer it so consecutive items merge into one list
    if (!block.includes('\n') && /^(\d+\.|-|\*)\s/.test(block)) {
      const ordered = /^\d+\./.test(block);
      const item = block.replace(/^(\d+\.|-|\*)\s+/, '');
      if (!listBuf) listBuf = { ordered, items: [] };
      listBuf.items.push(item);
      continue;
    }

    // Multi-line block where every line is a list item
    const lines = block.split('\n');
    if (lines.length > 1 && lines.every((l) => /^(\d+\.|-|\*)\s/.test(l))) {
      flushList();
      const ordered = /^\d+\./.test(lines[0]);
      const tag = ordered ? 'ol' : 'ul';
      const cls = ordered
        ? 'list-decimal list-outside ml-6 space-y-2 text-slate-300 mt-4 mb-6'
        : 'list-disc list-outside ml-6 space-y-2 text-slate-300 mt-4 mb-6';
      output.push(
        `<${tag} class="${cls}">${lines
          .map((l) => l.replace(/^(\d+\.|-|\*)\s+/, ''))
          .map((l) => `<li class="pl-1 leading-relaxed">${applyInline(l)}</li>`)
          .join('')}</${tag}>`
      );
      continue;
    }

    flushList();
    output.push(
      `<p class="text-slate-300 leading-relaxed mb-4">${applyInline(block.replace(/\n/g, ' '))}</p>`
    );
  }

  flushList();
  return output.join('\n');
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="pt-24 pb-20 px-4 text-center">
        <h1 className="text-white text-3xl font-bold mb-4">{t('blog.notFound')}</h1>
        <Link to="/blog" className="btn-outline">← {t('blog.allArticles')}</Link>
      </main>
    );
  }

  const displayTitle = isEn && post.titleEn ? post.titleEn : post.title;
  const displayExcerpt = isEn && post.excerptEn ? post.excerptEn : post.excerpt;
  const displayBody = isEn && post.bodyEn ? post.bodyEn : post.body;

  const blogPostSchema = makeBlogPostSchema({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    image: post.coverImage,
    slug: post.slug,
    body: post.body,
  });

  return (
    <>
      <SEOHead
        title={displayTitle}
        description={displayExcerpt}
        canonical={`/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify([
            blogPostSchema,
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: post.title, url: `/blog/${post.slug}` },
            ]),
          ])}
        </script>
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={[{ label: t('nav.blog'), to: '/blog' }, { label: displayTitle }]} />

          <article>
            {/* Cover image */}
            {post.coverImage && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-navy-700">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="800"
                  height="450"
                />
              </div>
            )}

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                {displayTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <User size={14} aria-hidden="true" />
                  <span>{t('blog.by')} <strong className="text-white">{post.author}</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={post.date}>{t('blog.published')} {new Date(post.date + 'T12:00:00').toLocaleDateString(isEn ? 'en-US' : 'sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                </span>
              </div>
            </header>

            {/* Speakable summary (AEO) */}
            <div className="post-speakable glass-card p-6 mb-8 border-l-4 border-blue-brand">
              <p className="text-slate-200 leading-relaxed italic">{displayExcerpt}</p>
            </div>

            {/* Body */}
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(displayBody) }}
            />

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link to="/blog" className="btn-outline flex items-center gap-2 text-sm">
                <ArrowLeft size={16} aria-hidden="true" /> {t('blog.allArticles')}
              </Link>
              <Link to="/contact" className="btn-primary text-sm">
                {t('blog.question')}
              </Link>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}
