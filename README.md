# The Free Security — Website

Static website for [The Free Security](https://thefreesecurity.com), a Serbian nonprofit cybersecurity organization.

**Stack:** Vite · React · TypeScript · Tailwind CSS v3 · React Router v6 (HashRouter) · react-i18next · react-helmet-async

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Deploy to GitHub Pages

1. Make sure the repo has GitHub Pages enabled (Settings → Pages → Source: `gh-pages` branch).
2. Set your Web3Forms access key in `src/pages/ContactPage.tsx` (replace `YOUR_WEB3FORMS_KEY`).
3. Run:

```bash
npm run deploy
```

This runs `npm run build` then pushes `dist/` to the `gh-pages` branch via `gh-pages`.

The `public/CNAME` file points GitHub Pages to `thefreesecurity.com`. Make sure the custom domain DNS is configured (A records or CNAME pointing to GitHub Pages IPs).

---

## How to add a blog post

1. Create a new file in `src/content/blog/your-post-slug.ts`:

```ts
import type { BlogPost } from '../../utils/blogPosts';

const post: BlogPost = {
  title: "Naslov posta",
  slug: "your-post-slug",           // must match filename
  date: "2025-04-01",               // YYYY-MM-DD
  author: "Ime Autora",
  excerpt: "Kratki opis koji se prikazuje u listi i kao meta description.",
  coverImage: "/assets/blog/your-image.webp",  // optional
  body: `## Uvodni naslov

Sadržaj posta u Markdown formatu. Bold i inline kod su podržani.

## Drugi naslov

Novi paragraf.`,
};

export default post;
```

1. Register it in `src/utils/blogPosts.ts`:

```ts
import post3 from '../content/blog/your-post-slug';
// ...
const posts: BlogPost[] = [post1, post2, post3].sort(...);
```

1. The post is automatically available at `/#/blog/your-post-slug`.

**Supported Markdown:** `## headings`, `**bold**`, inline code, unordered/ordered lists, paragraphs.

---

## How to add a team member

1. Drop the photo (square, WebP/JPG) into `public/assets/team/firstname-lastname.jpg`.
2. Add to the `members` array in `src/pages/TeamPage.tsx`:

```ts
{ name: 'Ime Prezime', slug: 'ime-prezime' },
```

The slug must match the filename (without extension). A detail page at `/#/team/ime-prezime` is created automatically.

For a mentor with bio, also add to `teamData` in `src/pages/TeamMemberPage.tsx`.

---

## How to add a career position

1. Create `src/content/careers/position-slug.ts` following the pattern in existing files.
2. Register in `src/utils/careerPosts.ts`.

---

## Translations

All UI strings are in:

- `src/locales/sr.json` — Serbian (default)
- `src/locales/en.json` — English

The language toggle in the navbar switches instantly. Preference saved to `localStorage`.

---

## Adding real logo assets

Drop files into `public/assets/images/`:

- `FreeSecSmall.svg` — logo for navbar/footer
- `FreeSecSingle.png` — alternative logo

Then update `Navbar.tsx` and `Footer.tsx` to use `<img>` instead of the `<Shield>` placeholder.

---

## File structure

```text
src/
  components/   Navbar, Footer, SEOHead, JsonLd, FAQAccordion,
                ServiceCard, TeamCard, BlogCard, Breadcrumb
  pages/        One file per route
  content/
    blog/       Blog post .ts files
    careers/    Career posting .ts files
  locales/      sr.json, en.json
  utils/        blogPosts.ts, careerPosts.ts
  App.tsx       Router + layout
  i18n.ts       i18next init

public/
  assets/images/   Logo files
  assets/team/     Team photos
  assets/blog/     Blog cover images
  robots.txt
  sitemap.xml      Update when adding pages/posts
  CNAME
  404.html         GitHub Pages SPA redirect
```

---

## SEO & JSON-LD schemas implemented

- Organization + WebSite + SearchAction (homepage)
- FAQPage (homepage + about)
- Service (services page)
- BlogPosting + speakable (blog posts)
- BreadcrumbList (all inner pages)
- Person (mentor team members)
- JobPosting (career detail pages)
- Open Graph + Twitter Card on every page

## Target Lighthouse scores

| Metric          | Target |
| --------------- | ------ |
| Performance     | 95+    |
| Accessibility   | 100    |
| Best Practices  | 100    |
| SEO             | 100    |
