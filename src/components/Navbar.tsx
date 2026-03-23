import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.services', to: '/services' },
  { key: 'nav.team', to: '/team' },
  { key: 'nav.blog', to: '/blog' },
  { key: 'nav.careers', to: '/careers' },
  { key: 'nav.contact', to: '/contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toggleLang = () => {
    const newLang = i18n.language === 'sr' ? 'en' : 'sr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-10 flex items-center justify-between h-20"
        aria-label="Glavna navigacija"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center font-bold text-white hover:opacity-80 transition-opacity"
          aria-label="The Free Security, Početna"
        >
          <img
            src="/assets/images/freesec-logo.png"
            alt="The Free Security logo"
            className="h-[134px] w-auto"
            width="134"
            height="134"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1.5" role="list">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3.5 py-2.5 rounded-md text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-white bg-blue-brand/20 border border-blue-brand/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                aria-current={isActive(link.to) ? 'page' : undefined}
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-md text-base font-semibold text-slate-300 hover:text-white border border-white/20 hover:border-blue-brand/50 transition-colors"
            aria-label={`Promeni jezik na ${t('nav.langToggle')}`}
          >
            <Globe size={17} aria-hidden="true" />
            {t('nav.langToggle')}
          </button>

          <Link
            to="/contact"
            className="hidden sm:inline-flex btn-primary py-2.5 px-5 text-base"
          >
            {t('nav.contact')}
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2.5 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Otvori/zatvori meni"
          >
            {mobileOpen ? <X size={29} /> : <Menu size={29} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/10">
          <nav className="px-5 py-3.5 space-y-1" aria-label="Mobilna navigacija">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3.5 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-white bg-blue-brand/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                aria-current={isActive(link.to) ? 'page' : undefined}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-md text-base font-semibold text-slate-300 hover:text-white border border-white/20 transition-colors"
              >
                <Globe size={17} />
                {t('nav.langToggle')}
              </button>
              <Link to="/contact" className="btn-primary py-2.5 px-5 text-base">
                {t('nav.contact')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
