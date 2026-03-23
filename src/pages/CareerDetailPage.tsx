import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { MapPin, Briefcase, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema } from '../components/JsonLd';
import careers from '../utils/careerPosts';

export default function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const job = careers.find((c) => c.slug === slug);

  if (!job) {
    return (
      <main className="pt-24 pb-20 px-4 text-center">
        <h1 className="text-white text-3xl font-bold mb-4">{t('careers.notFound')}</h1>
        <Link to="/careers" className="btn-outline">← {t('careers.backToCareers')}</Link>
      </main>
    );
  }

  const displayTitle = isEn && job.titleEn ? job.titleEn : job.title;
  const displayDepartment = isEn && job.departmentEn ? job.departmentEn : job.department;
  const displayType = isEn && job.typeEn ? job.typeEn : job.type;
  const displayDescription = isEn && job.descriptionEn ? job.descriptionEn : job.description;
  const displayResponsibilities = isEn && job.responsibilitiesEn ? job.responsibilitiesEn : job.responsibilities;
  const displayRequirements = isEn && job.requirementsEn ? job.requirementsEn : job.requirements;
  const displayBenefits = isEn && job.benefitsEn ? job.benefitsEn : job.benefits;

  return (
    <>
      <SEOHead
        title={`${displayTitle} | ${displayDepartment} | The Free Security`}
        description={displayDescription}
        canonical={`/careers/${job.slug}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'JobPosting',
              title: job.title,
              description: job.description,
              hiringOrganization: {
                '@type': 'Organization',
                name: 'The Free Security',
                sameAs: 'https://thefreesecurity.com',
              },
              jobLocation: {
                '@type': 'Place',
                address: { '@type': 'PostalAddress', addressCountry: 'RS' },
              },
              employmentType: 'VOLUNTEER',
              jobLocationType: 'TELECOMMUTE',
              datePosted: '2025-01-01',
            },
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Karijere', url: '/careers' },
              { name: displayTitle, url: `/careers/${job.slug}` },
  ]),
          ])}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb items={[{ label: t('careers.title'), to: '/careers' }, { label: displayTitle }]} />

          <div className="glass-card p-8 mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-3">{displayTitle}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={14} aria-hidden="true" />
                    {displayDepartment}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" />
                    {t('careers.remote')}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-brand/20 text-blue-bright border border-blue-brand/30">
                    {displayType}
                  </span>
                </div>
              </div>
              <Link to="/contact" className="btn-primary flex-shrink-0">
                {t('careers.apply')} <ArrowRight size={16} className="ml-2 inline" aria-hidden="true" />
              </Link>
            </div>

            <p className="text-slate-300 leading-relaxed">{displayDescription}</p>
          </div>

          {/* Responsibilities */}
          <div className="glass-card p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-5">{t('careers.responsibilities')}</h2>
            <ul className="space-y-3" role="list">
              {displayResponsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-blue-bright flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="glass-card p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-5">{t('careers.requirements')}</h2>
            <ul className="space-y-3" role="list">
              {displayRequirements.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <span className="w-1.5 h-1.5 bg-blue-brand rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-5">{t('careers.benefits')}</h2>
            <ul className="space-y-3" role="list">
              {displayBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/careers" className="btn-outline flex items-center gap-2">
              <ArrowLeft size={16} aria-hidden="true" /> {t('careers.allPositions')}
            </Link>
            <Link to="/contact" className="btn-primary flex items-center gap-2">
              {t('careers.applyNow')} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
