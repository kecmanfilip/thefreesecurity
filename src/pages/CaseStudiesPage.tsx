import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileSearch, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema } from '../components/JsonLd';
import { useTranslation } from 'react-i18next';

export default function CaseStudiesPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title="Studije slučaja | Primeri iz prakse The Free Security"
        description="Primeri iz prakse The Free Security: konkretni slučajevi gde smo pomogli organizacijama da se zaštite. Dolaze uskoro."
        canonical="/case-studies"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Studije slučaja', url: '/case-studies' },
            ])
          )}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: t('caseStudies.title') }]} />

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('caseStudies.title')}
            </h1>
          </div>

          {/* Coming soon */}
          <div className="glass-card p-16 text-center">
            <FileSearch
              size={64}
              className="text-blue-brand/40 mx-auto mb-6"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('caseStudies.comingSoon')}
            </h2>
            <p className="text-slate-300 max-w-lg mx-auto leading-relaxed mb-8">
              {t('caseStudies.text')}
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              {t('caseStudies.cta')} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Placeholder structure for future case studies */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-30 pointer-events-none" aria-hidden="true">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card p-6 h-48">
                <div className="h-3 bg-white/10 rounded w-3/4 mb-3" />
                <div className="h-2 bg-white/10 rounded w-full mb-2" />
                <div className="h-2 bg-white/10 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
