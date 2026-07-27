import type { BlogPost } from '../../utils/blogPosts';

const post: BlogPost = {
  title: "Rumunija odbila da plati otkup, pa je haker obrisao katastar: lekcija koju kritična infrastruktura mora da nauči",
  titleEn: "Romania Refused to Pay the Ransom, So a Hacker Wiped the Land Registry: A Lesson in Critical Infrastructure No One Should Ignore",
  slug: "romania-land-registry-ransomware-attack",
  date: "2026-07-27",
  author: "Filip Kecman",
  coverImage: "/assets/images/romania-land-registry-cover.png",
  excerpt: "Napad na rumunski katastar (ANCPI) je na nedelju dana zaustavio promet nekretnina u celoj zemlji. Ovo nije samo priča o jednom hakeru, već o tome zašto kritična infrastruktura mora imati testiranu bezbednost i pravi plan za dan kada sve pođe po zlu.",
  excerptEn: "A ransomware attack on Romania's land registry (ANCPI) froze real estate transactions nationwide for a week. This isn't just a story about one hacker, it's about why critical infrastructure needs tested security and a real plan for the day everything goes wrong.",
  body: `Sredinom jula 2026. sistemi rumunske Nacionalne agencije za katastar i overu nekretnina (ANCPI) prestali su da rade. Za par dana se ispostavilo da to nije bio tehnički kvar, već potvrđen sajber napad. Notari nisu mogli da overavaju promet nekretnina, građani nisu mogli da dobiju izvode iz katastra, a tržište na kom se godišnje sklopi između 150.000 i 170.000 prodaja nekretnina jednostavno je stalo na nedelju dana.

Napadač, koji se predstavlja kao "ByteToBreach" (rumunske vlasti ga povezuju sa pojedincem iz Alžira), tražio je otkup. Rumunija je odbila da plati, a napadač je nakon toga obrisao podatke sa produkcionih sistema i pokušao da uništi i rezervne kopije.

Tu dolazimo do dela priče koji je, po nama, važniji od same vesti: izvori se ne slažu oko toga šta je tačno obrisano. U delu medija je prošla priča da je "ceo katastar izbrisan". Detaljnija istraga Balkan Insight-a, međutim, tvrdi suprotno, da osnovne katastarske i pravne baze uopšte nisu bile kompromitovane i da nema dokaza da su lični podaci ili sertifikati o vlasništvu ukradeni. Ono što je stvarno procurelo su kredencijali zaposlenih, interna dokumentacija i izvorni kod sistema. Rumunska Direkcija za sajber bezbednost (DNSC) je dodala da napad "nije bio naročito kompleksan" i da je iskorišćena ranjivost koja je već bila poznata i prijavljena ANCPI-ju, samo nikad zakrpljena.

Nama ovde nije cilj da presudimo šta se tačno desilo, to će vremenom razjasniti zvanična istraga. Bitniji nam je razlog zašto se ovakve stvari dešavaju, jer je ovaj slučaj gotovo udžbenički primer nečega što svaka organizacija koja rukuje osetljivim ili kritičnim podacima mora da shvati, bilo da je državna agencija, banka ili malo preduzeće.

### Zašto je kritična infrastruktura omiljena meta

Katastar nije atraktivna meta kao banka ili berza, i baš zato je opasan primer. Sistemi koji vode katastar, matične knjige, zdravstvene kartone ili infrastrukturu snabdevanja retko dobijaju prioritet u budžetu za bezbednost, iako od njih zavisi svakodnevni život miliona ljudi.

Napadači to odlično znaju. Grupe koje se bave iznudom sistematski prate koje države i institucije manje ulažu u zaštitu svojih sistema, jer su to lakše i predvidljivije mete. Kad je ranjivost već poznata, prijavljena od nacionalnog CERT-a i i dalje nezakrpljena, kao što je ovde bio slučaj, napadaču ne treba nikakav sofisticiran alat. Dovoljno mu je da uđe kroz vrata koja su odavno trebalo da budu zaključana.

Ovo je nešto što stalno ponavljamo klijentima: bezbednost sistema se ne dokazuje izjavama koliko vam je bezbednost bitna, nego time da li ste je stvarno, nezavisno testirali. Zato postoji penetraciono testiranje, da neko razmišlja kao napadač i pronađe rupu pre nego što to uradi neko sa lošim namerama.

### Pitanje koje bi svaka organizacija trebalo unapred sebi da postavi

Bilo da su u ovom konkretnom slučaju stvarno obrisane osnovne baze ili samo prateći podaci, pravo pitanje glasi: šta bi mi radili da nam sutra neko obriše sve što imamo?

Odgovor vodi u dve povezane, ali različite discipline.

Prva je razumevanje kako ransomware zapravo radi i zašto sam backup nije automatska zaštita. Ransomware je zlonamerni softver koji enkriptuje, ili kao u ovom slučaju jednostavno briše podatke, a zatim traži novac za njihov povratak ili za to da ne budu objavljeni. Mnoge firme misle da su bezbedne samo zato što "imaju backup". Problem je što napadač koji je već upao unutra, sa administratorskim kredencijalima, po pravilu prvo cilja baš taj backup. Ako su rezervne kopije dostupne sa iste mreže, pod istim nalozima, bez posebne izolacije, onda one nisu druga linija odbrane, nego samo još jedan fajl koji će biti enkriptovan ili obrisan zajedno sa svime ostalim. Prema izjavama ANCPI-ja, napadač u ovom slučaju nije uspeo da uništi baš sve rezervne kopije jer su bile na više lokacija, i to je verovatno jedini razlog zašto je uopšte moglo nešto da se vrati.

Iz toga proizilazi pravilo 3-2-1, kao minimum, ne kao ideal. Ono kaže: drži najmanje tri kopije podataka, na dva različita tipa skladišta, sa bar jednom kopijom van glavne mreže, po mogućstvu offline ili nepromenljivom (na engleskom "immutable"), tako da je čak ni administrator ne može obrisati ili prepisati u određenom periodu. Ako sve tri kopije sede na istom serveru, u istoj mreži, dostupne istim kredencijalima, onda u suštini imate jedan backup koji ste triput sačuvali, a ne tri nezavisne linije odbrane.

Druga disciplina je ono što se zove BCDR, business continuity & disaster recovery, kontinuitet poslovanja i oporavak od katastrofe. Backup je samo jedan deo te priče. BCDR plan unapred definiše koliko brzo sistem mora ponovo da proradi (to se zove RTO, vreme oporavka), koliko podataka smemo da izgubimo u najgorem slučaju (RPO, tačka oporavka), ko je zadužen za svaki korak i kako organizacija funkcioniše dok se sistem oporavlja. U slučaju ANCPI-ja, to je konkretno pitanje šta rade notari i građani nedelju dana dok katastar ne proradi. Organizacije koje ovaj plan unapred uvežbaju kroz simulacije oporavljaju se za sate ili dane. One koje ga nikad nisu isprobale, svoje slabosti otkrivaju tek usred prave krize, pred novinarima i besnim korisnicima.

### Ovo košta, i to je u redu

Nezavisno testiranje bezbednosti, izolovani i nepromenljivi backupi i ozbiljan BCDR plan nisu jeftini. Traže budžet, vreme i ljude koji će ih redovno proveravati, ne samo jednom postaviti i zaboraviti na njih. Baš zato se toliko institucija, i privatnih i državnih, kladi da im se ništa neće desiti. Rumunski slučaj pokazuje koliko je ta kocka rizična: nedelju dana zamrznut promet nekretnina za celu zemlju, osetljivi podaci u prodaji na hakerskim forumima, i institucija koja svoju mrežu mora praktično da izgradi iznova.

Cena prevencije je uvek manja od cene oporavka posle napada. To nije fraza, nego nešto što ovaj slučaj konkretno pokazuje.

Ako vodite organizaciju koja rukuje podacima građana, klijenata ili kritičnim sistemima, a niste sigurni da li bi vaš tim znao šta da radi kad bi se sutra probudio i zatekao sve obrisano, to je tačno pitanje na koje vam mi u The Free Security besplatno pomažemo da odgovorite.`,
  bodyEn: `In mid-July 2026, systems at Romania's National Agency for Cadastre and Real Estate Advertising (ANCPI) stopped working. Within a few days, what looked like a technical outage was confirmed as a cyberattack. Notaries could not register property transactions, citizens could not obtain land registry extracts, and a market that handles between 150,000 and 170,000 property sales a year simply came to a halt.

The attacker, operating under the alias "ByteToBreach" (Romanian authorities have linked the persona to an individual based in Algeria), demanded a ransom. Romania refused to pay. After the refusal, the attacker wiped data from production systems and attempted to destroy backups as well.

This is where the story gets more important than the headline. Sources genuinely disagree on *what exactly* was deleted. Several outlets reported that "the entire land registry database" was wiped. A more detailed investigation (Balkan Insight) states that the core cadastral and legal databases were **not** compromised, and that there is no evidence personal data or ownership certificates were stolen, only that employee credentials, internal documentation, and the system's source code leaked. Officials from Romania's cybersecurity directorate (DNSC) also said the attack "wasn't particularly complex" and that it exploited a known, previously flagged vulnerability that ANCPI had not patched in time.

We are not writing this to settle exactly what was lost, official investigations will clarify that over time. We are writing it because this case is almost a textbook example of a few things every organization handling sensitive or critical data needs to understand, whether it's a government agency, a bank, or a small business.

### Why critical infrastructure is a favorite target

A land registry isn't a glamorous target the way a bank or a stock exchange is, and that's exactly what makes it a dangerous example. Systems that hold land records, civil registries, health records, or utility infrastructure are rarely a budget priority for security investment, even though millions of people's daily lives depend on them.

Attackers know this. Extortion groups systematically assess which countries and institutions under-invest in cybersecurity, because those are easier and "safer" targets. When a vulnerability is already known and reported by a national CERT, as was the case here, and it isn't patched, an attacker barely needs sophisticated tooling. It's enough to walk through a door that should have been locked long ago.

This is a point we constantly raise with clients: the security of a system isn't measured by how many times you've said security matters to you, it's measured by whether you've had it independently tested. Penetration testing exists precisely for this, to have someone with an attacker's mindset check the system before someone with bad intentions does.

### "The land registry was wiped" isn't just a headline, it's a scenario you need to plan for in advance

Regardless of whether the core databases were actually deleted in this specific case or only supporting data, the question every organization should ask itself is: **what would we do if someone deleted everything we have, tomorrow?**

That question leads directly into two related, but distinct, disciplines:

**Ransomware, and why a backup isn't automatic protection.** Ransomware is malicious software designed to encrypt (or, as in this case, simply delete) data and demand money for its return or non-disclosure. Many organizations believe they're safe because they "have a backup." The problem is that an attacker who is already inside, with administrator credentials, often targets that exact backup first. If backups are reachable from the same network, under the same accounts, without dedicated isolation, they aren't a separate line of defense, they're just another file that gets encrypted or deleted along with everything else. According to ANCPI's own statements, the attacker in this case did not succeed in destroying every backup, because copies were stored in multiple locations, which is likely the reason anything could be restored at all.

**The 3-2-1 rule as a minimum, not an ideal.** This is a simple, decades-proven recommendation: keep at least **3** copies of your data, on **2** different types of media/storage, with at least **1** copy off the main network (offline, or "immutable," meaning it cannot be deleted or overwritten by anyone, including an administrator, within a defined retention period). If all three copies sit on the same server, on the same network, reachable with the same credentials, then technically you have one backup saved three times, not three independent lines of defense.

**Business Continuity & Disaster Recovery (BCDR).** A backup is only one part of the wider picture. BCDR is a plan that defines in advance: how fast systems must be restored (RTO, recovery time objective), how much data the organization can afford to lose in the worst case (RPO, recovery point objective), who is responsible for each step, and how the organization keeps functioning while systems are being recovered (in ANCPI's case: what notaries and citizens do for a week while the registry is down). Organizations that rehearse this in advance, through drills and testing, recover in hours or days. Organizations that have never tested it discover their weaknesses in the middle of a crisis, in front of journalists and furious users.

### This costs money, and that's fine

Security testing, isolated and immutable backups, and a serious BCDR plan aren't cheap. They require budget, time, and people who check them regularly, not just set them up once and forget about them. That's exactly why so many institutions, private and public alike, gamble that nothing will happen to them. The Romanian case shows how dangerous that bet is: a week of frozen real estate transactions nationwide, sensitive data for sale on hacking forums, and an institution that literally has to rebuild its network from scratch.

The cost of prevention is always lower than the cost of recovering after an attack, and that isn't just a slogan, it's exactly what this case demonstrates.

If you run an organization that handles citizens' data, customer data, or critical systems, and you aren't sure your team would know what to do if it woke up tomorrow to find everything deleted, that is exactly the question we at The Free Security help you answer, free of charge.`,
  faq: [
    {
      question: "Da li je zaista cela baza katastra u Rumuniji obrisana?",
      answer: "Izvori se ne slažu. Deo medija je preneo da je cela baza obrisana, dok detaljnija istraga Balkan Insight-a tvrdi da osnovne katastarske i pravne baze nisu bile kompromitovane, i da su procureli uglavnom kredencijali zaposlenih, interna dokumentacija i izvorni kod sistema, a ne sami podaci iz katastra. Tačan obim štete će razjasniti zvanična istraga."
    },
    {
      question: "Zašto backup nije bio dovoljan da spreči prekid rada?",
      answer: "Backup sam po sebi nije zaštita ako je dostupan sa iste mreže i pod istim kredencijalima kao i proizvodni sistem, jer ga napadač koji je već unutra može enkriptovati ili obrisati zajedno sa ostalim podacima. Prema izjavama ANCPI-ja, napadač u ovom slučaju nije uspeo da uništi sve rezervne kopije jer su bile skladištene na više lokacija, što je organizaciji omogućilo delimičan oporavak."
    },
    {
      question: "Šta znači pravilo 3-2-1 za backup?",
      answer: "To je preporuka da se čuvaju najmanje 3 kopije podataka, na 2 različita tipa skladišta, sa najmanje 1 kopijom van glavne mreže, po mogućstvu offline ili nepromenljivom (immutable), tako da je ni napadač sa administratorskim pristupom ne može obrisati ili prepisati u zadatom periodu."
    },
    {
      question: "Šta je BCDR i zašto je bitan za organizacije koje upravljaju kritičnim podacima?",
      answer: "BCDR (Business Continuity & Disaster Recovery) je plan koji unapred definiše koliko brzo sistem mora da se vrati u funkciju, koliko podataka organizacija sme da izgubi u najgorem scenariju, ko je odgovoran za svaki korak oporavka i kako se posluje dok se sistem obnavlja. Organizacije koje ovaj plan unapred testiraju kroz vežbe oporavljaju se mnogo brže od onih koje ga nikad nisu isprobale."
    },
    {
      question: "Zašto su hakeri baš kritičnu infrastrukturu poput katastra izabrali za metu?",
      answer: "Sistemi poput katastra, matičnih registara ili zdravstvenih kartona retko dobijaju prioritet u budžetima za bezbednost, iako od njih zavisi svakodnevni život miliona ljudi. Napadači sistematski procenjuju koje zemlje i institucije manje ulažu u sajber bezbednost i biraju upravo takve, lakše mete, posebno kada je poznata ranjivost ostala nezakrpljena."
    },
  ],
  faqEn: [
    {
      question: "Was Romania's entire land registry database really wiped?",
      answer: "Sources disagree. Some outlets reported the entire database was deleted, while a more detailed investigation (Balkan Insight) states the core cadastral and legal databases were not compromised, and that mostly employee credentials, internal documentation, and system source code leaked, not the land records themselves. The exact scope of the damage will be clarified by the official investigation."
    },
    {
      question: "Why wasn't having a backup enough to prevent the outage?",
      answer: "A backup isn't protection on its own if it's reachable from the same network and under the same credentials as the production system, since an attacker already inside can encrypt or delete it along with everything else. According to ANCPI's own statements, the attacker in this case did not manage to destroy every backup because copies were stored in multiple locations, which allowed for partial recovery."
    },
    {
      question: "What is the 3-2-1 backup rule?",
      answer: "It's the recommendation to keep at least 3 copies of your data, on 2 different types of storage, with at least 1 copy off the main network, ideally offline or immutable, so that even an attacker with administrator access cannot delete or overwrite it within a defined period."
    },
    {
      question: "What is BCDR and why does it matter for organizations that manage critical data?",
      answer: "BCDR (Business Continuity & Disaster Recovery) is a plan that defines in advance how quickly a system must be restored, how much data the organization can afford to lose in the worst case, who is responsible for each recovery step, and how the organization keeps operating while systems are being rebuilt. Organizations that test this plan in advance through drills recover far faster than those that have never rehearsed it."
    },
    {
      question: "Why do hackers target critical infrastructure like a land registry specifically?",
      answer: "Systems like land registries, civil registries, or health records rarely get security budget priority, even though millions of people's daily lives depend on them. Attackers systematically assess which countries and institutions under-invest in cybersecurity and choose exactly those easier targets, especially when a known vulnerability was left unpatched."
    },
  ],
};

export default post;
