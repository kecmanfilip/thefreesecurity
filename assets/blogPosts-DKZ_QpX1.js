import{t as e}from"./createLucideIcon-DFpDu7k-.js";var t=e(`calendar`,[[`path`,{d:`M8 2v4`,key:`1cmpym`}],[`path`,{d:`M16 2v4`,key:`4m81vk`}],[`rect`,{width:`18`,height:`18`,x:`3`,y:`4`,rx:`2`,key:`1hopcy`}],[`path`,{d:`M3 10h18`,key:`8toen8`}]]),n=e(`user`,[[`path`,{d:`M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2`,key:`975kel`}],[`circle`,{cx:`12`,cy:`7`,r:`4`,key:`17ys0d`}]]),r=[{title:`Kako zapravo funkcionišu moderni infostealeri`,titleEn:`How Modern Infostealers Actually Work`,slug:`how-modern-infostealers-actually-function`,date:`2025-12-03`,author:`Ivan Mrsulja`,excerpt:`Moderni infostealeri su sofisticirani maliciozni programi koji tiho kradu lozinke, kolačiće, kriptovalute i lične podatke. Evo tačno kako to rade i kako se zaštititi.`,excerptEn:`Modern infostealers are sophisticated malicious programs that silently steal passwords, cookies, cryptocurrency, and personal data. Here's exactly how they work and how to protect yourself.`,coverImage:`/assets/blog/infostealers-cover.webp`,body:`U svetu digitalnog podzemlja, malo koja roba je toliko vredna kao ukradeni podaci neke kompanije. Softveri za krađu informacija ili popularno "infostealeri", koriste se kao tools-of-the-trade u ovoj oblasti ilegalnih aktivnosti.

Oni nisu alati poput ransomvera, koji pokušavaju da osakate čitav sistem i onemoguće mu rad dok se ne odplati tražena suma, već precizni alati dizajnirani za jednu svrhu: da tiho i efikasno izvuku vaše poverljive podatke.

U The Free Security-u, naš tim svakodnevno istražuje kako ove pretnje evoluiraju u sofisticirane platforme za prikupljanje podataka. Ovaj blog post zalazi u životni ciklus infostealera, od početne infekcije sistema, pa sve do eksfiltracije podataka, kako bismo vam što bolje objasnili o kakvim pretnjama je reč.

## Infekcija sistema (Delivery)

Životni ciklus infostealera počinje isporukom (delivery), gde napadači imaju veoma širok i robustan set alata.

- Najčešći tip kod ranijih verzija je bio tzv. dropper, maliciozni izvršni fajl koji je u sebi sadržao kompresovani glavni payload, često prerušen u krekovani softver ili legitimni dokument.
- Nakon izvršavanja, payload se raspakivao i infostealer bi bio instaliran na sistem.
- S obzirom na veoma velik i očigledan digitalni otisak, ovaj vid malvera prilično lako detektuje svaki mainstream AV provajder danas.

Trenutno, tehnike instaliranja bez korišćenja fajlova (fileless), gde se malware nikad ni ne zapisuje na disk su standard. Izvršni kod živi isključivo u memoriji, koristeći već prisutne sistemske alate poput \`PowerShell\`-a ili \`Windows Management Instrumentation (WMI)\` za izvršavanje svog payload-a.

Ovaj LoTL (living-off-the-land) pristup čini detekciju neverovatno težkom za tradicionalna antivirusna rešenja, jer je jako teško uočiti razliku između legitimne administracione aktivnosti i malicioznog ponašanja.

## Prikupljanje podataka (Harvest)

Nakon što se instalira na sistem, infostealer započinje prikupljanje podataka.

Njegove primarne mete su veb browser-i, gde alat pokušava da izvuče sačuvane lozinke, podatke koji su sačuvani za automatsko popunjavanje (autofill), kolačiće i sačuvane informacije o kreditnim karticama. Alat (u najgorem slučaju) to radi lociranjem i (optimizovanim) brute-force dekriptovanjem lokalnih DB fajlova pretraživača.

Međutim, na Windows mašinama, moguće je preuzeti master key direktno iz \`LSASS\` procesa, čime se zaobilaze enkriptovane SQLite baze. U novijim verzijama Chrome-a i Edge-a, gde su DB fajlovi zaštićeni AES-om sa ključevima unutar DPAPI-ja, ovo omogućava dekodiranje bez pristupa file sistemu.

Interesantan je i pristup kod hook-ovanja \`CryptUnprotectData\`, \`ReadProcessMemory\` i \`HttpSendRequestW\` WinAPI funkcija što omogućava otkrivanje lozinki, tokena i kolačića u trenutku korišćenja, takođe bez interakcije sa diskom.

Moderni infostealeri poput RedLine-a ili Vidar-a koriste manifest parsing da otkriju gde se tačno nalaze korisničke datoteke keystore-a, čak i kod portable varijanti wallet ekstenzija.

Pored svega navedenog, targetiraju se i:

- VPN klijenti (NordVPN, OpenVPN certifikati)
- Chat aplikacije (Discord, Telegram session keys)
- AWS CLI/Google Cloud CLI token fajlovi
- GitHub SSH privatni ključevi i PAT tokeni

Kompromitovanje zadnja četiri artefakta je posebno opasno jer omogućavaju preuzimanje DevOps ili cloud naloga bez potrebe za dodatnom eskalacijom.

## Izvoz podataka

Nakon prikupljanja, podaci se stage-uju u memoriji kompromitovane mašine. Isti se pakuju i kompresuju korišćenjem brotli, zstd ili custom XOR+LZ algoritma pre nego što se i šta pošalje.

Pošto stealer mora da ih prebaci na drugi sistem bez podizanja bilo kakvih AV ili SIEM alert-ova, iako neki infostealeri i dalje koriste direktnu komunikaciju sa Command-and-Control (C2) serverom preko HTTP/HTTPS, to nije najbolja opcija za napadača jer su SIEM/XDR sistemi postali veoma dobri u uočavanju ovakve komunikacije.

U skorije vreme, često viđamo da se podaci usmeravaju preko legitimnih cloud aplikacija poput Discorda, Telegrama ili platformi za razmenu fajlova kao što je Google Drive. Softver šalje ukradene podatke u privatni kanal ili folder putem javnog API-a aplikacije, efektivno stapajući ukradene podatke unutar legitimnog internet saobraćaja.

- Neke varijante embed-uju podatke u PNG fajlove i šalju ih na Imgur, Pastebin privatne paste-ove ili čak Medium draft postove (kao plaintext blokove).
- Takođe, da bi izbegli anomaly-based detekciju implementira se sporije slanje podataka (< 30kbps), random sleep intervali (20-200s) i imitacija legit HTTP zaglavlja (Chrome 123 ili Edge 119 signature).
- Uočene su i metode korišćenja CDN maski poput Cloudflare, Akamai ili Fastly kako bi se C2 komunikacija prikazala kao legitimni TLS saobraćaj ka popularnim domenama (npr. ajax.googleapis.com), a zapravo se tunelira ka C2 serveru.

## Eskalacija i održavanje pristupa (Post-Delivery Tradecraft)

Savremeni infostealeri retko se zaustavljaju samo na jednom prikupljanju podataka (grab-n-go). Kako bi omogućili duže prisustvo na sistemu i povećali vrednost kompromitovanog host-a, mnoge varijante implementiraju mehanizme za eskalaciju privilegija i perzistenciju.

Umesto klasičnog upisa u Run registry key ili kreiranja Windows servisa (tehnike koje generišu mnogo SIEM i EDR alert-a), u modernim infostealer-ima koriste se:

1. **COM hijacking** - kreiranje malicioznih COM objekata u \`HKCUSoftwareClassesCLSID...\`, što omogućava procesima da pozivaju API malvera kroz potpuno legitimne COM pozive.

2. **WMI permanent event subscribers** - kreiranje \`__EventFilter\` + \`CommandLineEventConsumer\` objekata, obično u \`rootsubscription\`, koji aktiviraju malver pri pojavi određenog event-a (logon, network reconnect, execution of a particular binary...).

3. **DLL search order hijacking** - iskorišćavanje loše konfigurisanih aplikacija koje učitavaju DLL-ove bez normalizacije na apsolutnu putanju. Zlonamerni DLL se jednostavno učita pre legitimnog DLL-a.

4. **API unhooking i PPID spoofing** - sakrivanje tragova putem patchovanja EDR hook-ova u \`ntdll.dll\`, kao i pokretanje malvera sa lažno prikazanim parent procesom (npr. podsistem koji izgleda kao \`explorer.exe\` ili \`svchost.exe\`).

Ovi mehanizmi dramatično otežavaju detekciju jer zaobilaze heuristiku baziranu na ponašanju procesa.

Treba naglasiti i da većina modernih infostealera funkcioniše kao Malware-as-a-Service (MaaS) gde tim developera održava glavni repozitorijum koda i hosting infrastrukturu. Kupci (affiliates) preko UI panela dobijaju build generator, enkriptor/packer funkcionalnosti, prikaz statistike (broj zaraženih host-ova, geolokacijsku vizuelizaciju zaraženih host-ova...), i razne plug-in module (kripto wallet, FTP credential stealer, RDP credential extractor) zavisno od paketa koji su platili.

Zbog ovog biznis modela razvoj novih funkcionalnosti je ekstremno brz, alat se ažurira na nedeljnom nivou dok plugin-i za detekciju kasne mesecima.

Svi ukradeni podaci se sortiraju automatski u bucket-e:

- email lozinke
- PayPal
- bankarske informacije
- kripto
- korporativni nalozi
- developer nalozi
- cloud provider nalozi

## Kako da se zaštitite

Razumevanje tehničkih aspekata ovih pretnji je prvi korak u izgradnji efikasne odbrane.

1. Oslanjanje isključivo na tradicionalni antivirus zasnovan na signature-based detekciji više nije dovoljno.

2. Savremeni sistemi za monitoring moraju uključivati behavioralno praćenje kroz EDR (Endpoint Detection and Response) platforme koje mogu da označe sumnjivu aktivnost u izvršavanju native script koda koji je indikator fileless malware-a.

3. Mrežno praćenje mora biti dovoljno pametno da otkrije anomalije u odlaznim tokovima podataka, čak i prema naizgled legitimnim cloud uslugama.

4. Sprovođenje principa najmanjih privilegija (Least Privilege and Need-To-Know) može dramatično da smanji posledice krađe kredencijala, sprečavajući da kompromitacija lokalnog korisnika rezultuje preuzimanjem potpune kontrole nad mašinom ili internom mrežom.

Pretnja od infostealera predstavlja realnu opasnost za organizacije svih veličina. Zalaženjem dublje u njihov rad ispod haube, možemo osmisliti efikasne odbrambene strategije.

U The Free Security-u, posvećeni smo da uvek budemo korak ispred ovih pretnji, razvijajući alate, metode i stručnost naših inženjera, neophodne da zaštitimo ono što je najvažnije: vaše podatke.`,bodyEn:`In the world of the digital underground, few commodities are as valuable as stolen company data. Information-stealing software tools, popularly known as "infostealers", are the tools of the trade in this area of illegal activity.

They are not tools like ransomware, which attempts to cripple an entire system and render it inoperable until a ransom is paid. Instead, they are precision instruments designed for a single purpose: to quietly and efficiently extract your confidential data.

At The Free Security, our team investigates daily how these threats evolve into sophisticated data collection platforms. This blog post dives into the lifecycle of an infostealer, from initial system infection all the way to data exfiltration, to give you the clearest possible picture of what these threats actually are.

## System Infection (Delivery)

The infostealer lifecycle begins with delivery, where attackers have a broad and robust set of tools at their disposal.

- The most common type in earlier versions was the so-called dropper, a malicious executable that contained a compressed main payload, often disguised as cracked software or a legitimate document.
- Upon execution, the payload would unpack and the infostealer would be installed on the system.
- Given the very large and obvious digital footprint, this type of malware is fairly easily detected by mainstream AV providers today.

Currently, fileless installation techniques (where malware is never written to disk) are the standard. Executable code lives exclusively in memory, using already-present system tools like \`PowerShell\` or \`Windows Management Instrumentation (WMI)\` to execute its payload.

This LoTL (living-off-the-land) approach makes detection incredibly difficult for traditional antivirus solutions, because it's very hard to distinguish between legitimate administrative activity and malicious behavior.

## Data Collection (Harvest)

Once installed on the system, the infostealer begins data collection.

Its primary targets are web browsers, where the tool attempts to extract saved passwords, autofill data, cookies, and saved credit card information. The tool does this (in the worst case) by locating and (optimized) brute-force decrypting local browser DB files.

However, on Windows machines, it's possible to retrieve the master key directly from the \`LSASS\` process, bypassing encrypted SQLite databases. In newer versions of Chrome and Edge, where DB files are protected with AES using keys inside DPAPI, this enables decoding without accessing the file system.

Also of interest is the approach of hooking \`CryptUnprotectData\`, \`ReadProcessMemory\`, and \`HttpSendRequestW\` WinAPI functions, which enables the discovery of passwords, tokens, and cookies at the moment of use, also without disk interaction.

Modern infostealers like RedLine or Vidar use manifest parsing to discover exactly where user keystore files are located, even for portable variants of wallet extensions.

In addition to the above, the following are also targeted:

- VPN clients (NordVPN, OpenVPN certificates)
- Chat applications (Discord, Telegram session keys)
- AWS CLI/Google Cloud CLI token files
- GitHub SSH private keys and PAT tokens

Compromise of the last four artifacts is particularly dangerous as it enables taking over DevOps or cloud accounts without the need for additional escalation.

## Data Exfiltration

After collection, data is staged in the memory of the compromised machine. It is then packed and compressed using brotli, zstd, or a custom XOR+LZ algorithm before anything is sent.

Since the stealer must transfer data to another system without triggering any AV or SIEM alerts, although some infostealers still use direct Command-and-Control (C2) communication over HTTP/HTTPS, this is not the best option for attackers as SIEM/XDR systems have become very good at detecting such communication.

Recently, we frequently observe data being routed through legitimate cloud applications like Discord, Telegram, or file-sharing platforms like Google Drive. The software sends stolen data to a private channel or folder via the application's public API, effectively blending stolen data within legitimate internet traffic.

- Some variants embed data in PNG files and send them to Imgur, Pastebin private pastes, or even Medium draft posts (as plaintext blocks).
- To avoid anomaly-based detection, slower data transmission is implemented (< 30kbps), random sleep intervals (20-200s), and imitation of legitimate HTTP headers (Chrome 123 or Edge 119 signatures).
- Methods using CDN masking via Cloudflare, Akamai, or Fastly have also been observed, making C2 communication appear as legitimate TLS traffic to popular domains (e.g., ajax.googleapis.com) while actually tunneling to the C2 server.

## Escalation and Persistence (Post-Delivery Tradecraft)

Modern infostealers rarely stop at a single data grab. To enable longer presence on the system and increase the value of the compromised host, many variants implement privilege escalation and persistence mechanisms.

Instead of the classic Run registry key write or Windows service creation (techniques that generate many SIEM and EDR alerts), modern infostealers use:

1. **COM hijacking**: creating malicious COM objects in \`HKCUSoftwareClassesCLSID...\`, enabling processes to call the malware's API through completely legitimate COM calls.

2. **WMI permanent event subscribers**: creating \`__EventFilter\` + \`CommandLineEventConsumer\` objects, usually in \`rootsubscription\`, that activate the malware when a specific event occurs (logon, network reconnect, execution of a particular binary...).

3. **DLL search order hijacking**: exploiting poorly configured applications that load DLLs without normalizing to an absolute path. The malicious DLL is simply loaded before the legitimate DLL.

4. **API unhooking and PPID spoofing**: hiding traces by patching EDR hooks in \`ntdll.dll\`, as well as running malware with a spoofed parent process (e.g., a subsystem that looks like \`explorer.exe\` or \`svchost.exe\`).

These mechanisms dramatically complicate detection because they bypass heuristics based on process behavior.

It's also worth noting that the majority of modern infostealers operate as Malware-as-a-Service (MaaS) platforms where a developer team maintains the main code repository and hosting infrastructure. Customers (affiliates) receive through the UI panel a build generator, encryptor/packer functionality, statistics dashboards (number of infected hosts, geolocation visualization of infected hosts...), and various plug-in modules (crypto wallet, FTP credential stealer, RDP credential extractor) depending on the package they've paid for.

Due to this business model, development of new features is extremely fast, with the tool being updated weekly while detection plugins lag behind by months.

All stolen data is automatically sorted into buckets:

- Email passwords
- PayPal
- Banking information
- Crypto
- Corporate accounts
- Developer accounts
- Cloud provider accounts

## How to Protect Yourself

Understanding the technical aspects of these threats is the first step in building an effective defense.

1. Relying solely on traditional signature-based antivirus detection is no longer enough.

2. Modern monitoring systems must include behavioral tracking through EDR (Endpoint Detection and Response) platforms that can flag suspicious activity in the execution of native script code, an indicator of fileless malware.

3. Network monitoring must be smart enough to detect anomalies in outgoing data flows, even toward seemingly legitimate cloud services.

4. Enforcing the principle of least privilege (Least Privilege and Need-To-Know) can dramatically reduce the consequences of credential theft, preventing the compromise of a local user from resulting in full control over the machine or internal network.

The infostealer threat represents a real danger to organizations of all sizes. By diving deeper into how they work under the hood, we can design effective defensive strategies.

At The Free Security, we are committed to always staying one step ahead of these threats, developing the tools, methods, and expertise our engineers need to protect what matters most: your data.`},{title:`Zašto The Free Security Postoji?`,titleEn:`Why Does The Free Security Exist?`,slug:`why-does-the-free-security-exist`,date:`2025-10-17`,author:`Filip Kecman`,coverImage:`/assets/images/freesec-logo.png`,excerpt:`The Free Security nije nastao iz poslovnog plana, nastao je iz frustracije. Evo iskrena priča o tome zašto smo odlučili da sajber bezbednost učinimo dostupnom svima, bez naplate.`,excerptEn:`The Free Security wasn't born from a business plan — it was born from frustration. Here's the honest story of why we decided to make cybersecurity accessible to everyone, free of charge.`,body:`Da li ste znali da su neke od zemalja našeg regiona ocenjene kao najranjivije na sajber napade u celoj Evropi?

Ako vas to iznenađuje, niste jedini. Problem leži u "potpunom nedostatku svesti o sajber bezbednosti." Zbog toga se napadi prećutkuju da bi se sačuvala reputacija, a kompanije, posebno mala i srednja preduzeća koja su naš fokus, vide bezbednost kao skup trošak, a ne kao ključno ulaganje.

Mi smo tu da to promenimo.

### Kako je sve počelo

Osnivanje The Free Security nije se desilo slučajno. Pokrenula su nas dva ključna "okidača".

Prvi je bio čista frustracija gorenavedenom statistikom. Drugi je bio lično iskustvo. Kao neko ko je i sam imao mentora na svom putu ka karijeri etičkog hakera, video sam kolika je moć deljenja znanja. Spontano sam počeo da mentorišem nekoliko ljudi, taj broj je rastao, i tada se rodila ideja:

Šta ako stvorimo organizaciju od koje svi imaju koristi?

1. Studenti i entuzijasti dobijaju neprocenjivo praktično iskustvo radeći na stvarnim projektima.

2. Mala, srednja preduzeća i organizacije (koje to nikada ne bi mogle da priušte) dobijaju besplatnu proveru bezbednosti i šansu da se zaštite.

Tako je rođen The Free Security. Naša misija nije samo tehnička, ona je i ekonomska i edukativna. Želimo da podignemo svest na Balkanu, da zaštitimo podatke građana i sprečimo da firme sa sjajnim potencijalom propadnu zbog napada koji je mogao biti sprečen.

Želimo da edukujemo sve, od studenata do naših roditelja. Jer, budimo iskreni, svako od nas je primio onaj sumnjivi SMS o "neuspeloj pošiljci" ili email od "nigerijskog princa". Opasnost je stvarna i tiče se svih nas.

### Naš tim nije sastavljen samo od hakera

Da budemo jasni, mi smo pre svega organizacija koja pruža usluge penetracionog testiranja.

Za naše tehničke pozicije (Etički Hakeri), tražimo studente IT fakulteta i druge entuzijaste koji već imaju praktično iskustvo sa platformi kao što su TryHackMe, HackTheBox ili PortSwigger. Zašto? Zato što kod nas nema simulacija. Odmah se radi na pravim projektima, uz mentorstvo, i potrebno nam je da imate osnovu sa koje možemo da gradimo. (Planiramo i obuke od nule, ali to je faza koja tek dolazi.)

ALI, ono što radimo je beskorisno ako niko nikada nije čuo za nas.

Zato su nam jednako očajnički potrebni ljudi u marketingu i razvoju partnerstava. Naša misija je sjajna, prvi smo i jedini na svetu sa ovim pristupom. Ali to ostaje samo lepa priča ako nemamo ljude koji će je ispričati, povezati nas sa kompanijama i izgraditi brend.

U našoj organizaciji nema hijerarhije gde je neko "iznad". Mi smo sistem. Tehnički tim, marketinški tim i tim za partnerstva su tri noge stolice. Ako jedna fali, svi padamo.

### Zašto bi neko radio ovo besplatno? Zbog iskustva.

Ne nudimo platu. Nudimo nešto što je, dugoročno, mnogo vrednije.

Svako ko se priključi, bilo u pentestu, marketingu ili partnerstvima, dobija potpunu slobodu. Slobodu da primeni teoriju sa fakulteta ili kursa u praksi. Slobodu da testira svoje ideje. Kod nas nema šefa koji vam stoji nad glavom. Postoji samo dogovor, poštovanje i zajednički cilj.

Lično verujem da je iskustvo jedina stvar koja nas zaista razlikuje na tržištu rada. Količina iskustva koju ćete steći kod nas direktno je srazmerna vašoj posvećenosti. Ako želite da se "ubijate" od posla, za šest meseci ćete imati znanje i portfolio koji svaki poslodavac želi da vidi.

Bilo da je to portfolio od tri profesionalna pentest izveštaja, uspešno vođena marketinška kampanja od nule, ili prvo sklopljeno partnerstvo sa realnom kompanijom, to je ono što upisujete u CV. Uz to, dobijate pristup mreži (network) ljudi koji su jednako strastveni kao i vi.

### Mali koraci, veliki cilj

Za sada, naš uticaj je možda mali, ali je stvaran. To je nekoliko uspešnih projekata. To je nekoliko članova organizacije koji su stekli ključno iskustvo.

Iskreno, da i jednoj osobi pomognemo da lansira svoju karijeru, ja sam prezadovoljan. I da i jednoj maloj firmi sprečimo finansijsku propast zbog sajber napada, mi smo uspeli u našoj misiji.

Za godinu dana od danas, vidim The Free Security kao vodeću organizaciju ovog tipa u regionu. Vidim duplo više članova i mnogo veći uticaj. Vidim nas kako pomažemo čak i državnim institucijama, jer ponavljam: mi ne radimo ovo zbog para.

Radimo ovo jer neko mora.

Ako verujete u ovu misiju, ako ste željni stvarnog iskustva i želite da budete deo nečega što pravi promenu, pogledajte naše otvorene pozicije.

Hajde da zajedno učinimo digitalni svet bezbednijim mestom. Za sve nas.`,bodyEn:`Did you know that some countries in our region have been rated as the most vulnerable to cyberattacks in all of Europe?

If that surprises you, you're not alone. The problem lies in a "complete lack of cybersecurity awareness." Because of this, attacks are kept quiet to preserve reputation, and companies, especially the small and medium-sized businesses that are our focus, see security as an expensive cost rather than a critical investment.

We're here to change that.

### How It All Started

The founding of The Free Security didn't happen by accident. It was driven by two key "triggers."

The first was pure frustration with the statistics above. The second was personal experience. As someone who had a mentor on my own path toward an ethical hacking career, I saw the power of sharing knowledge. I spontaneously began mentoring a few people, that number grew, and then an idea was born:

What if we created an organization where everyone benefits?

1. Students and enthusiasts gain invaluable hands-on experience working on real projects.

2. Small and medium-sized businesses and organizations (who could never afford it otherwise) get a free security check and a chance to protect themselves.

That's how The Free Security was born. Our mission isn't only technical, it's economic and educational. We want to raise awareness across the Balkans, protect citizens' data, and prevent companies with brilliant potential from collapsing because of an attack that could have been prevented.

We want to educate everyone, from students to our own parents. Because, let's be honest, every one of us has received that suspicious SMS about a "failed delivery" or an email from a "Nigerian prince." The danger is real and it affects all of us.

### Our Team Isn't Made Up Only of Hackers

To be clear, we are first and foremost an organization that provides penetration testing services.

For our technical positions (Ethical Hackers), we look for IT students and other enthusiasts who already have hands-on experience from platforms like TryHackMe, HackTheBox, or PortSwigger. Why? Because there are no simulations with us. You work on real projects from day one, with mentorship, and we need you to have a foundation to build from. (We do plan to introduce beginner training, but that's a phase still to come.)

BUT, what we do is useless if no one has ever heard of us.

That's why we equally desperately need people in marketing and partnership development. Our mission is great, we're the first and only organization in the world with this approach. But it stays just a nice story if we don't have people to tell it, connect us with companies, and build the brand.

There's no hierarchy in our organization where someone is "above" another. We are a system. The technical team, the marketing team, and the partnerships team are the three legs of a chair. If one is missing, we all fall.

### Why Would Anyone Work for Free? For the Experience.

We don't offer a salary. We offer something that is, in the long run, much more valuable.

Everyone who joins, whether in pentesting, marketing, or partnerships, gets complete freedom. The freedom to apply theory from university or a course in practice. The freedom to test their ideas. There's no boss standing over your head here. There's only agreement, respect, and a shared goal.

I personally believe that experience is the only thing that truly sets us apart in the job market. The amount of experience you gain with us is directly proportional to your commitment. If you want to work yourself hard, in six months you'll have the knowledge and portfolio that every employer wants to see.

Whether that's a portfolio of three professional pentest reports, a marketing campaign successfully run from scratch, or the first real company partnership you landed, that's what goes on your CV. On top of that, you gain access to a network of people who are just as passionate as you are.

### Small Steps, Big Goal

For now, our impact may be small, but it's real. It's a handful of successful projects. It's a handful of organization members who have gained crucial experience.

Honestly, if we help even one person launch their career, I'm more than satisfied. And if we prevent even one small company from financial ruin because of a cyberattack, we have succeeded in our mission.

A year from now, I see The Free Security as the leading organization of this kind in the region. I see twice as many members and a much greater impact. I see us helping even government institutions, because I'll say it again: we don't do this for money.

We do this because someone has to.

If you believe in this mission, if you're hungry for real experience and want to be part of something that makes a difference, check out our open positions.

Let's make the digital world a safer place. For all of us.`}].sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime());export{n,t as r,r as t};