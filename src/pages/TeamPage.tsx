import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/SEOHead';
import TeamCard from '../components/TeamCard';
import Breadcrumb from '../components/Breadcrumb';
import { makeBreadcrumbSchema, makePersonSchema } from '../components/JsonLd';

const mentors = [
  {
    name: 'Filip Kecman',
    roleKey: 'team.role.founder',
    slug: 'filip-kecman',
    image: '/assets/team/filip-kecman.jpg',
  },
  {
    name: 'Damjan Cvetanović',
    roleKey: 'team.role.advisor',
    slug: 'damjan-cvetanovic',
    image: '/assets/team/damjan-cvetanovic.jpg',
  },
  {
    name: 'Dušan Jevtić',
    roleKey: 'team.role.mentor',
    slug: 'dusan-jevtic',
    image: '/assets/team/dusan-jevtic.jpg',
  },
];

const members: { name: string; slug: string; roleKey?: string; ext?: string; imageClass?: string }[] = [
  { name: 'Ivan Mršulja', slug: 'ivan-mrsulja', roleKey: 'team.role.pentesterFull' },
  { name: 'Nemanja Dutina', slug: 'nemanja-dutina' },
  { name: 'Lefteris Adamou', slug: 'lefteris-adamou' },
  { name: 'Anastasija Spasić', slug: 'anastasija-spasic' },
  { name: 'Andrija Nikolić', slug: 'andrija-nikolic' },
  { name: 'Tigran Parun Filipov', slug: 'tigran-parun-filipov', roleKey: 'team.role.pentesterFull' },
  { name: 'Igor Guljaš', slug: 'igor-guljas' },
  { name: 'Relja Mitrović', slug: 'relja-mitrovic', roleKey: 'team.role.pentesterFull' },
  { name: 'Stefan Vučković', slug: 'stefan-vuckovic', roleKey: 'team.role.pentesterFull', imageClass: 'object-top' },
  { name: 'Nina Janeva', slug: 'nina-janeva' },
  { name: 'Mateja Marjanović', slug: 'mateja-marjanovic' },
  { name: 'Aleksandar Kojić', slug: 'aleksandar-kojic', ext: 'png', imageClass: 'object-top' },
  { name: 'Aleksandar Lalović', slug: 'aleksandar-lalovic' },
  { name: 'Boris Kostadinov', slug: 'boris-kostadinov' },
  { name: 'Ilija Pavlović', slug: 'ilija-pavlovic' },
  { name: 'Martin Sivč', slug: 'martin-sivc' },
  { name: 'Miloš Vuksanović', slug: 'milos-vuksanovic', ext: 'jpeg' },
  { name: 'Strahinja Grujić', slug: 'strahinja-grujic' },
  { name: 'Teodor Jakovljević', slug: 'teodor-jakovljevic', ext: 'jpg', imageClass: 'object-top' },
];

export default function TeamPage() {
  const { t } = useTranslation();

  const personSchemas = mentors.map((m) =>
    makePersonSchema({
      name: m.name,
      jobTitle: t(m.roleKey),
      url: `https://thefreesecurity.com/#/team/${m.slug}`,
      image: `https://thefreesecurity.com${m.image}`,
    })
  );

  return (
    <>
      <SEOHead
        title="Tim | Stručnjaci iza The Free Security"
        description="Upoznajte tim The Free Security: osnivač Filip Kecman, savetnik Damjan Cvetanović, mentor Dušan Jevtić i posvećeni tim penetration testera i praktikanata u sajber bezbednosti."
        canonical="/team"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify([
            { '@context': 'https://schema.org', '@graph': personSchemas },
            makeBreadcrumbSchema([
              { name: 'Početna', url: '/' },
              { name: 'Tim', url: '/team' },
            ]),
          ])}
        </script>
      </Helmet>

      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={[{ label: t('team.title') }]} />

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('team.title')}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {t('team.subtitle')}
            </p>
          </div>

          {/* Mentors */}
          <section aria-labelledby="mentors-heading" className="mb-16">
            <h2 id="mentors-heading" className="text-2xl font-bold text-white mb-8 text-center">
              {t('team.mentors')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {mentors.map((m) => (
                <TeamCard
                  key={m.slug}
                  name={m.name}
                  role={t(m.roleKey)}
                  slug={m.slug}
                  image={m.image}
                  isMentor
                />
              ))}
            </div>
          </section>

          {/* Members */}
          <section aria-labelledby="members-heading">
            <h2 id="members-heading" className="text-2xl font-bold text-white mb-8 text-center">
              {t('team.members')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {members.map((m) => (
                <TeamCard
                  key={m.slug}
                  name={m.name}
                  role={t(m.roleKey ?? 'team.role.pentester')}
                  slug={m.slug}
                  image={`/assets/team/${m.slug}.${m.ext ?? 'jpg'}`}
                  imageClass={m.imageClass}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
