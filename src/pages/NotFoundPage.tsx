import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Shield, Home } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title="404 | Stranica nije pronađena"
        description="Stranica koju tražite ne postoji."
        noIndex
      />

      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-brand/10 flex items-center justify-center">
            <Shield size={40} className="text-blue-brand/50" aria-hidden="true" />
          </div>

          <p className="text-blue-bright font-mono text-6xl font-bold mb-4" aria-hidden="true">
            404
          </p>

          <h1 className="text-2xl font-bold text-white mb-4">
            {t('notFound.title')}
          </h1>

          <p className="text-slate-400 mb-8">
            {t('notFound.text')}
          </p>

          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Home size={18} aria-hidden="true" />
            {t('notFound.back')}
          </Link>
        </div>
      </main>
    </>
  );
}
