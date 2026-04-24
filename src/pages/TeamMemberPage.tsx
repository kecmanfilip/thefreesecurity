import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema, makePersonSchema } from '../components/JsonLd';

const teamData: Record<string, { name: string; roleKey: string; bio?: string }> = {
  'filip-kecman': {
    name: 'Filip Kecman',
    roleKey: 'team.role.founder',
    bio: 'Filip Kecman je osnivač i izvršni direktor The Free Security. Sa iskustvom u ofanzivnoj bezbednosti i penetration testingu, Filip je pokrenuo organizaciju sa jasnom misijom: učiniti sajber bezbednost dostupnom svima.',
  },
  'damjan-cvetanovic': {
    name: 'Damjan Cvetanović',
    roleKey: 'team.role.advisor',
    bio: 'Damjan Cvetanović je savetnik organizacije sa godinama iskustva u industrijskoj bezbednosti. Njegova ekspertiza pomaže timu da se suoči sa izazovima u realnom poslovnom okruženju.',
  },
  'dusan-jevtic': {
    name: 'Dušan Jevtić',
    roleKey: 'team.role.mentor',
    bio: 'Dušan Jevtić je mentor i trener koji vodi program obuke The Free Security. Posebno se fokusira na praktičnu primenu znanja i pripremu stažista za industrijsku praksu.',
  },
};

const memberNames: Record<string, string> = {
  'ivan-mrsulja': 'Ivan Mršulja',
  'nemanja-dutina': 'Nemanja Dutina',
  'lefteris-adamou': 'Lefteris Adamou',
  'anastasija-spasic': 'Anastasija Spasić',
  'andrija-nikolic': 'Andrija Nikolić',
  'tigran-parun-filipov': 'Tigran Parun Filipov',
  'igor-guljas': 'Igor Guljaš',
  'relja-mitrovic': 'Relja Mitrović',
  'stefan-vuckovic': 'Stefan Vučković',
  'nina-janeva': 'Nina Janeva',
  'mateja-marjanovic': 'Mateja Marjanović',
  'aleksandar-kojic': 'Aleksandar Kojić',
  'aleksandar-lalovic': 'Aleksandar Lalović',
  'boris-kostadinov': 'Boris Kostadinov',
  'ilija-pavlovic': 'Ilija Pavlović',
  'martin-sivc': 'Martin Sivč',
  'milos-vuksanovic': 'Miloš Vuksanović',
  'strahinja-grujic': 'Strahinja Grujić',
  'teodor-jakovljevic': 'Teodor Jakovljević',
};

const memberRoles: Record<string, string> = {
  'ivan-mrsulja': 'team.role.pentesterFull',
  'tigran-parun-filipov': 'team.role.pentesterFull',
  'relja-mitrovic': 'team.role.pentesterFull',
  'stefan-vuckovic': 'team.role.pentesterFull',
};

const memberImageExt: Record<string, string> = {
  'aleksandar-kojic': 'png',
  'milos-vuksanovic': 'jpeg',
  'teodor-jakovljevic': 'jpg',
};

const memberImageClass: Record<string, string> = {
  'stefan-vuckovic': 'object-top',
  'aleksandar-kojic': 'object-top',
  'teodor-jakovljevic': 'object-top',
  'anastasija-spasic': 'object-top',
  'andrija-nikolic': 'object-top',
};

export default function TeamMemberPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  if (!slug) return null;

  const mentor = teamData[slug];
  const memberName = memberNames[slug];

  const name = mentor?.name || memberName;
  const roleKey = mentor?.roleKey || memberRoles[slug] || 'team.role.pentester';
  const role = t(roleKey);
  const bio = mentor?.bio;
  const image = `/assets/team/${slug}.${memberImageExt[slug] ?? 'jpg'}`;

  if (!name) {
    return (
      <main className="pt-24 pb-20 px-4 text-center">
        <h1 className="text-white text-3xl font-bold mb-4">{t('team.notFound')}</h1>
        <Link to="/team" className="btn-outline">← {t('team.backToTeam')}</Link>
      </main>
    );
  }

  const personSchema = makePersonSchema({
    name,
    jobTitle: role,
    url: `https://thefreesecurity.com/#/team/${slug}`,
    image: `https://thefreesecurity.com${image}`,
  });

  return (
    <>
      <SEOHead
        title={`${name} | ${role} | The Free Security`}
        description={bio || `${name} je član tima The Free Security kao ${role}. Zajedno gradimo bezbedniji digitalni prostor.`}
        canonical={`/team/${slug}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify([
            personSchema,
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Tim', url: '/team' },
              { name: name, url: `/team/${slug}` },
            ]),
          ])}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Breadcrumb items={[{ label: t('nav.team'), to: '/team' }, { label: name }]} />

          <div className="glass-card p-10 text-center">
            {/* Avatar */}
            <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-blue-brand/20 flex items-center justify-center">
              <img
                src={image}
                alt={`${name}, ${role}`}
                className={`w-full h-full object-cover ${memberImageClass[slug] ?? ''}`}
                loading="eager"
                width="112"
                height="112"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="text-3xl font-bold text-blue-400">${name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}</span>`;
                  }
                }}
              />
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
            <p className="text-blue-bright font-medium mb-6">{role}</p>

            {bio ? (
              <p className="text-slate-300 leading-relaxed text-left">{bio}</p>
            ) : (
              <p className="text-slate-400 italic">
                {name} {t('team.memberBioFallback')} {role}.
              </p>
            )}

            <div className="mt-8 flex justify-center gap-4">
              <Link to="/team" className="btn-outline flex items-center gap-2">
                <ArrowLeft size={16} aria-hidden="true" /> {t('team.backToTeam')}
              </Link>
              <Link to="/contact" className="btn-primary">
                {t('team.contact')}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
