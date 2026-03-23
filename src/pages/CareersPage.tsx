import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema } from '../components/JsonLd';
import careers from '../utils/careerPosts';

export default function CareersPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <>
      <SEOHead
        title="Karijere | Pridruži se timu The Free Security"
        description="Otvorene pozicije u The Free Security: etički haker, marketing stručnjak, partnership developer. Volonterske i stažistske pozicije u sajber bezbednosti."
        canonical="/careers"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Karijere', url: '/careers' },
            ])
          )}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: t('careers.title') }]} />

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('careers.title')}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t('careers.subtitle')}
            </p>
          </div>

          <div className="space-y-5">
            {careers.map((job) => (
              <article
                key={job.slug}
                className="glass-card p-6 hover:bg-white/8 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">{isEn && job.titleEn ? job.titleEn : job.title}</h2>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} aria-hidden="true" />
                        {isEn && job.departmentEn ? job.departmentEn : job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} aria-hidden="true" />
                        {t('careers.remote')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-brand/20 text-blue-bright border border-blue-brand/30">
                        {isEn && job.typeEn ? job.typeEn : job.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/careers/${job.slug}`}
                    className="btn-outline text-sm flex-shrink-0 flex items-center gap-2"
                  >
                    {t('careers.readMore')} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 glass-card p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">
              {t('careers.noPosition')}
            </h2>
            <p className="text-slate-300 mb-5">
              {t('careers.openApplication')}
            </p>
            <Link to="/contact" className="btn-primary">
              {t('careers.sendOpen')}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
