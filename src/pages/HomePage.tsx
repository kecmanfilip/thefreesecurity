import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, Globe, BookOpen, Search, FileText, UserSearch, Users, ArrowRight, BookOpenCheck, Star, Briefcase } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { organizationSchema, websiteSchema, makeFAQSchema } from '../components/JsonLd';
import FAQAccordion from '../components/FAQAccordion';
import ServiceCard from '../components/ServiceCard';


const serviceIcons = [Globe, BookOpen, Search, FileText, UserSearch, Users];
const serviceTitleKeys = [
  'services.items.webApp.title',
  'services.items.training.title',
  'services.items.infra.title',
  'services.items.policy.title',
  'services.items.footprint.title',
  'services.items.consulting.title',
];
const serviceDescKeys = [
  'services.items.webApp.description',
  'services.items.training.description',
  'services.items.infra.description',
  'services.items.policy.description',
  'services.items.footprint.description',
  'services.items.consulting.description',
];

export default function HomePage() {
  const { t } = useTranslation();

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
  ];

  const tickerServices = t('hero.tickerItems', { returnObjects: true }) as string[];
  const tickerItems = [...tickerServices, ...tickerServices];

  return (
    <>
      <SEOHead
        title="The Free Security | Besplatna sajber bezbednost za sve"
        description="The Free Security je srpska neprofitna organizacija koja pruža besplatne usluge sajber bezbednosti: web app testing, obuka, OSINT, politike i konsalting. Besplatno za sve."
        canonical="/"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify([organizationSchema, websiteSchema, makeFAQSchema(faqItems)])}
        </script>
      </Helmet>

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(46,95,170,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-brand/10 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="text-blue-bright font-bold text-2xl sm:text-3xl tracking-wide mb-4">
              The Free Security
            </p>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {t('hero.headline')}
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              {t('hero.subheadline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
                {t('hero.ctaPrimary')}
              </Link>
              <Link to="/services" className="btn-outline text-base px-8 py-3.5">
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </div>

          {/* Ticker */}
          <div className="absolute bottom-8 left-0 right-0 overflow-hidden" aria-hidden="true">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 px-4">
              <span>{t('hero.tickerLabel')}</span>
            </div>
            <div className="relative overflow-hidden border-y border-white/5 py-3">
              <div className="ticker-track">
                {tickerItems.map((item, i) => (
                  <span key={i} className="flex-shrink-0 px-6 text-sm text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-brand rounded-full" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT SUMMARY ───────────────────────────────── */}
        <section className="page-section bg-navy-800/50" aria-labelledby="about-summary-heading">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="about-summary-heading" className="section-title">{t('about.title')}</h2>
              <p className="text-slate-400 text-base mt-2">
                <strong className="text-blue-bright text-2xl">{t('about.stat')}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-8">
                <div className="w-10 h-10 bg-blue-brand/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield size={20} className="text-blue-bright" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t('about.missionTitle')}</h3>
                <p className="text-slate-400 leading-relaxed">{t('about.missionText')}</p>
              </div>
              <div className="glass-card p-8">
                <div className="w-10 h-10 bg-blue-brand/20 rounded-lg flex items-center justify-center mb-4">
                  <Star size={20} className="text-blue-bright" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{t('about.visionTitle')}</h3>
                <p className="text-slate-400 leading-relaxed">{t('about.visionText')}</p>
              </div>
            </div>

            <div className="text-center">
              <Link to="/about" className="btn-outline">
                {t('about.learnMore')} <ArrowRight size={16} className="ml-2 inline" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SERVICES OVERVIEW ───────────────────────────── */}
        <section className="page-section" aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="services-heading" className="section-title">{t('services.title')}</h2>
              <p className="section-subtitle">{t('services.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {serviceIcons.map((Icon, i) => (
                <ServiceCard
                  key={i}
                  icon={Icon}
                  titleKey={serviceTitleKeys[i]}
                  descKey={serviceDescKeys[i]}
                />
              ))}
            </div>

            <div className="text-center">
              <Link to="/services" className="btn-outline">
                {t('services.viewAll')} <ArrowRight size={16} className="ml-2 inline" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY JOIN ────────────────────────────────────── */}
        <section className="page-section bg-navy-800/50" aria-labelledby="why-join-heading">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="why-join-heading" className="section-title">{t('whyJoin.title')}</h2>
              <p className="section-subtitle">{t('whyJoin.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: BookOpenCheck, titleKey: 'whyJoin.practical.title', descKey: 'whyJoin.practical.desc' },
                { icon: Users, titleKey: 'whyJoin.mentorship.title', descKey: 'whyJoin.mentorship.desc' },
                { icon: Briefcase, titleKey: 'whyJoin.experience.title', descKey: 'whyJoin.experience.desc' },
              ].map(({ icon: Icon, titleKey, descKey }, i) => (
                <div key={i} className="glass-card p-8 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-brand/20 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-blue-bright" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{t(titleKey)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section className="page-section" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 id="faq-heading" className="section-title">{t('faq.title')}</h2>
            </div>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* ── CONTACT CTA ─────────────────────────────────── */}
        <section className="page-section bg-gradient-to-r from-blue-brand/20 via-navy-800 to-blue-brand/20 border-y border-blue-brand/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">{t('contactCta.title')}</h2>
            <p className="section-subtitle mb-8">{t('contactCta.text')}</p>
            <Link to="/contact" className="btn-primary text-base px-10 py-4">
              {t('contactCta.btn')} <ArrowRight size={18} className="ml-2 inline" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
