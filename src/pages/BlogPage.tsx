import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import BlogCard from '../components/BlogCard';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema } from '../components/JsonLd';
import posts from '../utils/blogPosts';

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <>
      <SEOHead
        title="Blog | Sajber bezbednost, analize i edukacija"
        description="Čitajte stručne članke o sajber bezbednosti, analizama pretnji, edukativnim vodičima i vestima iz sveta infoseca. The Free Security blog."
        canonical="/blog"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Blog', url: '/blog' },
            ])
          )}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: t('blog.title') }]} />

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                title={isEn && post.titleEn ? post.titleEn : post.title}
                excerpt={isEn && post.excerptEn ? post.excerptEn : post.excerpt}
                date={post.date}
                author={post.author}
                slug={post.slug}
                coverImage={post.coverImage}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
