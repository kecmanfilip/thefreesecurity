import post1 from '../content/blog/how-modern-infostealers-actually-function';
import post2 from '../content/blog/why-does-the-free-security-exist';

export interface BlogPost {
  title: string;
  titleEn?: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  excerptEn?: string;
  coverImage?: string;
  body: string;
  bodyEn?: string;
}

const posts: BlogPost[] = [post1, post2].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default posts;
