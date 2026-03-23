import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Globe, BookOpen, Search, FileText, UserSearch, Users, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema, makeServiceSchema } from '../components/JsonLd';

const services = [
  { icon: Globe,       titleKey: 'services.items.webApp.title',    descKey: 'services.items.webApp.description',    detailsKey: 'services.items.webApp.details' },
  { icon: BookOpen,    titleKey: 'services.items.training.title',   descKey: 'services.items.training.description',  detailsKey: 'services.items.training.details' },
  { icon: Search,      titleKey: 'services.items.infra.title',      descKey: 'services.items.infra.description',     detailsKey: 'services.items.infra.details' },
  { icon: FileText,    titleKey: 'services.items.policy.title',     descKey: 'services.items.policy.description',    detailsKey: 'services.items.policy.details' },
  { icon: UserSearch,  titleKey: 'services.items.footprint.title',  descKey: 'services.items.footprint.description', detailsKey: 'services.items.footprint.details' },
  { icon: Users,       titleKey: 'services.items.consulting.title', descKey: 'services.items.consulting.description',detailsKey: 'services.items.consulting.details' },
];

export default function ServicesPage() {
  const { t } = useTranslation();

  const serviceSchemas = services.map((s) =>
    makeServiceSchema(t(s.titleKey), t(s.descKey), '/services')
  );


  return (
    <>
      <SEOHead
        title="Usluge | Besplatne usluge sajber bezbednosti"
        description="The Free Security nudi besplatne usluge web app testiranja, obuke, skeniranja infrastrukture, OSINT analize i konsaltinga. Sve besplatno za neprofitne organizacije i MSP."
        canonical="/services"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify([
            { '@context': 'https://schema.org', '@graph': serviceSchemas },
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Usluge', url: '/services' },
            ]),
          ])}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: t('nav.services') }]} />

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('services.title')}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {services.map(({ icon: Icon, titleKey, descKey, detailsKey }, i) => {
              const details = t(detailsKey, { returnObjects: true }) as string[];
              return (
              <article
                key={i}
                className="glass-card p-8 hover:bg-white/8 transition-all duration-300"
                aria-labelledby={`service-${i}-heading`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-blue-brand/20 flex items-center justify-center">
                      <Icon size={28} className="text-blue-bright" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 id={`service-${i}-heading`} className="text-xl font-bold text-white mb-3">
                      {t(titleKey)}
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-5">{t(descKey)}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {details.map((detail, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-slate-400">
                          <span className="w-1.5 h-1.5 bg-blue-brand rounded-full flex-shrink-0" aria-hidden="true" />
                          {detail}
                        </div>
                      ))}
                    </div>

                    <Link to="/contact" className="btn-primary inline-flex text-sm px-5 py-2.5">
                      {t('services.cta')} <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 glass-card p-10 text-center bg-gradient-to-br from-blue-brand/10 to-transparent">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('services.notSure')}
            </h2>
            <p className="text-slate-300 mb-6">
              {t('services.contactDesc')}
            </p>
            <Link to="/contact" className="btn-primary">
              {t('services.letsTalk')} <ArrowRight size={16} className="ml-2 inline" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
