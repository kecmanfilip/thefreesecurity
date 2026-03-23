import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Shield, Target, Eye, Users, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import FAQAccordion from '../components/FAQAccordion';
import Breadcrumb from '../components/Breadcrumb';
import { organizationSchema, makeFAQSchema, makeBreadcrumbSchema } from '../components/JsonLd';

export default function AboutPage() {
  const { t } = useTranslation();

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
  ];

  return (
    <>
      <SEOHead
        title="O nama | Ko je The Free Security i zašto postoji?"
        description="The Free Security je neprofitna organizacija za sajber bezbednost. Osnovali su je Filip Kecman i Damjan Cvetanović sa misijom da zaštitu učine dostupnom svima, besplatno."
        canonical="/about"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify([
            organizationSchema,
            makeFAQSchema(faqItems),
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'O nama', url: '/about' },
            ]),
          ])}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: t('nav.about') }]} />

          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t('about.pageTitle')}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {t('about.heroDesc')}
            </p>
          </div>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" aria-labelledby="mission-heading">
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-blue-brand/20 rounded-xl flex items-center justify-center mb-5">
                <Target size={24} className="text-blue-bright" aria-hidden="true" />
              </div>
              <h2 id="mission-heading" className="text-2xl font-bold text-white mb-4">{t('about.missionTitle')}</h2>
              <p className="text-slate-300 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
            <div className="glass-card p-8">
              <div className="w-12 h-12 bg-blue-brand/20 rounded-xl flex items-center justify-center mb-5">
                <Eye size={24} className="text-blue-bright" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t('about.visionTitle')}</h2>
              <p className="text-slate-300 leading-relaxed">
                {t('about.visionText')}
              </p>
            </div>
          </section>

          {/* Why we exist */}
          <section className="mb-16" aria-labelledby="why-exist-heading">
            <h2 id="why-exist-heading" className="text-3xl font-bold text-white mb-6">{t('about.whyExistTitle')}</h2>
            <div className="glass-card p-8">
              <p className="text-slate-300 leading-relaxed mb-4">{t('about.whyExistP1')}</p>
              <p className="text-slate-300 leading-relaxed mb-4">{t('about.whyExistP2')}</p>
              <p className="text-slate-300 leading-relaxed">{t('about.whyExistP3')}</p>
            </div>
          </section>

          {/* What we do */}
          <section className="mb-16" aria-labelledby="what-we-do-heading">
            <h2 id="what-we-do-heading" className="text-3xl font-bold text-white mb-6">{t('about.whatWeDoTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(t('about.whatWeDoItems', { returnObjects: true }) as string[]).map((item, i) => (
                <div key={i} className="flex items-start gap-3 glass-card p-4">
                  <CheckCircle size={20} className="text-blue-bright flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Founding story */}
          <section className="mb-16" aria-labelledby="founding-heading">
            <h2 id="founding-heading" className="text-3xl font-bold text-white mb-6">{t('about.foundingTitle')}</h2>
            <div className="glass-card p-8">
              <p className="text-slate-300 leading-relaxed mb-4">{t('about.foundingP1')}</p>
              <p className="text-slate-300 leading-relaxed mb-4">{t('about.foundingP2')}</p>
              <p className="text-slate-300 leading-relaxed">{t('about.foundingP3')}</p>
            </div>
          </section>

          {/* Who we are */}
          <section className="mb-16" aria-labelledby="who-we-are-heading">
            <h2 id="who-we-are-heading" className="text-3xl font-bold text-white mb-6">{t('about.whoWeAreTitle')}</h2>
            <div className="glass-card p-8">
              <p className="text-slate-300 leading-relaxed mb-4">{t('about.whoWeAreP1')}</p>
              <p className="text-slate-300 leading-relaxed">{t('about.whoWeAreP2')}</p>
            </div>
          </section>

          {/* Why choose us */}
          <section className="mb-16" aria-labelledby="why-choose-heading">
            <h2 id="why-choose-heading" className="text-3xl font-bold text-white mb-8">{t('about.whyChooseTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {([
                { icon: Shield,      key: 'free' },
                { icon: Users,       key: 'expert' },
                { icon: BookOpen,    key: 'practical' },
                { icon: CheckCircle, key: 'privacy' },
                { icon: Target,      key: 'tailored' },
                { icon: Eye,         key: 'transparency' },
              ] as const).map(({ icon: Icon, key }, i) => (
                <div key={i} className="glass-card p-6">
                  <Icon size={22} className="text-blue-bright mb-3" aria-hidden="true" />
                  <h3 className="text-white font-semibold mb-2">{t(`about.whyChoose.${key}.title`)}</h3>
                  <p className="text-slate-400 text-sm">{t(`about.whyChoose.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How we train */}
          <section className="mb-16" aria-labelledby="training-heading">
            <h2 id="training-heading" className="text-3xl font-bold text-white mb-6">{t('about.trainingTitle')}</h2>
            <div className="glass-card p-8">
              <p className="text-slate-300 leading-relaxed mb-4">{t('about.trainingP1')}</p>
              <p className="text-slate-300 leading-relaxed mb-4">{t('about.trainingP2')}</p>
              <p className="text-slate-300 leading-relaxed">{t('about.trainingP3')}</p>
            </div>
          </section>

          {/* CTA */}
          <section className="glass-card p-10 text-center bg-gradient-to-br from-blue-brand/10 to-transparent" aria-labelledby="about-cta-heading">
            <h2 id="about-cta-heading" className="text-2xl font-bold text-white mb-4">
              {t('about.ctaTitle')}
            </h2>
            <p className="text-slate-300 mb-6">
              {t('about.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                {t('nav.contact')} <ArrowRight size={16} className="ml-2 inline" aria-hidden="true" />
              </Link>
              <Link to="/careers" className="btn-outline">
                {t('about.openPositions')}
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-16" aria-labelledby="about-faq-heading">
            <h2 id="about-faq-heading" className="text-3xl font-bold text-white mb-8 text-center">
              {t('faq.title')}
            </h2>
            <FAQAccordion items={faqItems} />
          </section>
        </div>
      </main>
    </>
  );
}
