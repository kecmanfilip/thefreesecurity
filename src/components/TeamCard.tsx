import { Link } from 'react-router-dom';

interface TeamCardProps {
  name: string;
  role: string;
  slug?: string;
  image?: string;
  isMentor?: boolean;
  imageClass?: string;
}

export default function TeamCard({ name, role, slug, image, isMentor = false, imageClass = '' }: TeamCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const CardContent = () => (
    <>
      {/* Avatar */}
      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-blue-brand/20 flex items-center justify-center flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={`${name}, ${role}`}
            className={`w-full h-full object-cover ${imageClass}`}
            loading="lazy"
            width="80"
            height="80"
          />
        ) : (
          <span className="text-xl font-bold text-blue-bright" aria-hidden="true">
            {initials}
          </span>
        )}
      </div>

      <h3 className="text-white font-semibold text-center">{name}</h3>
      <p className="text-slate-400 text-sm text-center mt-1">{role}</p>

      {isMentor && (
        <span className="mt-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-brand/20 text-blue-bright border border-blue-brand/30">
          Mentor
        </span>
      )}
    </>
  );

  if (slug) {
    return (
      <Link
        to={`/team/${slug}`}
        className="glass-card p-6 flex flex-col items-center hover:bg-white/8 transition-all duration-300 group"
        aria-label={`${name}, ${role}`}
      >
        <CardContent />
      </Link>
    );
  }

  return (
    <article className="glass-card p-6 flex flex-col items-center">
      <CardContent />
    </article>
  );
}
