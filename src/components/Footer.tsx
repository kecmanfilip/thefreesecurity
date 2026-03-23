import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin } from 'lucide-react';

const quickLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.services', to: '/services' },
  { key: 'nav.team', to: '/team' },
  { key: 'nav.blog', to: '/blog' },
  { key: 'nav.careers', to: '/careers' },
  { key: 'nav.contact', to: '/contact' },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy-800 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-white mb-3"
              aria-label="The Free Security"
            >
              <img
                src="/assets/images/freesec-logo.png"
                alt="The Free Security logo"
                className="h-7 w-auto"
                width="28"
                height="28"
              />
              <span>The Free Security</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {t('footer.tagline')}
            </p>
            <p className="text-slate-500 text-xs">{t('footer.nonprofit')}</p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.linkedin.com/company/the-free-security/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-bright transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigacija">
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2" role="list">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact')}</h3>
            <a
              href="mailto:filip.kecman@thefreesecurity.com"
              className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-4"
            >
              <Mail size={16} aria-hidden="true" />
              filip.kecman@thefreesecurity.com
            </a>

            <h3 className="text-white font-semibold mb-2 mt-6">{t('footer.legal')}</h3>
            <p className="text-slate-500 text-xs">
              {t('footer.mb')}: 28400861
            </p>
            <p className="text-slate-500 text-xs mt-1">
              {t('footer.pib')}: 115125563
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-slate-500 text-sm flex flex-col sm:flex-row items-center justify-center gap-2 flex-wrap">
          <span>{t('footer.copyright')}</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span>
            Dizajn, razvoj i SEO:{' '}
            <a
              href="https://quantex.rs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Quantex.rs
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
