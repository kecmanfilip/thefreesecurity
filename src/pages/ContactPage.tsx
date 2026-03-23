import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema } from '../components/JsonLd';

const WEB3FORMS_KEY = '3d0475c7-1a13-4f7d-855a-f6e23cfe5495';

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...form,
          subject: `${t('contact.emailSubject')}: ${form.name} | The Free Security`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <SEOHead
        title="Kontakt | Zatraži besplatnu procenu sajber bezbednosti"
        description="Kontaktirajte The Free Security za besplatnu procenu sajber bezbednosti. Odgovaramo u roku od 48 sati. Email: filip.kecman@thefreesecurity.com"
        canonical="/contact"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Kontakt', url: '/contact' },
            ])
          )}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Breadcrumb items={[{ label: t('contact.title') }]} />

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-slate-300">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Success state */}
          {status === 'success' ? (
            <div className="glass-card p-10 text-center">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-white mb-3">{t('contact.thankYou')}</h2>
              <p className="text-slate-300">{t('contact.success')}</p>
              <button
                onClick={() => setStatus('idle')}
                className="btn-outline mt-6"
              >
                {t('contact.sendNew')}
              </button>
            </div>
          ) : (
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} noValidate aria-label="Kontakt forma">
                {/* Name */}
                <div className="mb-5">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('contact.name')} <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-navy-700/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand transition-colors"
                    placeholder={t('contact.namePlaceholder')}
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('contact.email')} <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-navy-700/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand transition-colors"
                    placeholder={t('contact.emailPlaceholder')}
                    autoComplete="email"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('contact.message')} <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-navy-700/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand transition-colors resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 mb-4" role="alert">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" aria-hidden="true" />
                    <p className="text-red-300 text-sm">{t('contact.error')}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={18} aria-hidden="true" />
                  {status === 'sending' ? t('contact.sending') : t('contact.send')}
                </button>
              </form>

              {/* Direct contact */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-slate-400 text-sm mb-2">{t('contact.directEmail')}</p>
                <a
                  href="mailto:filip.kecman@thefreesecurity.com"
                  className="flex items-center justify-center gap-2 text-blue-bright hover:text-white transition-colors font-medium"
                >
                  <Mail size={16} aria-hidden="true" />
                  filip.kecman@thefreesecurity.com
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
