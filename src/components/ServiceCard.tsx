import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

export default function ServiceCard({ icon: Icon, titleKey, descKey }: ServiceCardProps) {
  const { t } = useTranslation();

  return (
    <article className="glass-card p-6 flex flex-col h-full hover:bg-white/8 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-blue-brand/20 flex items-center justify-center mb-4 group-hover:bg-blue-brand/30 transition-colors">
        <Icon size={24} className="text-blue-bright" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{t(titleKey)}</h3>
      <p className="text-slate-400 text-sm leading-relaxed flex-1">{t(descKey)}</p>
      <Link
        to="/contact"
        className="mt-4 text-blue-bright text-sm font-medium hover:text-white transition-colors flex items-center gap-1"
      >
        {t('services.cta')} →
      </Link>
    </article>
  );
}
