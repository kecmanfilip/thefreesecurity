interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schemas
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Free Security',
  url: 'https://thefreesecurity.com',
  logo: 'https://thefreesecurity.com/assets/images/FreeSecSmall.svg',
  description: 'Srpska neprofitna organizacija koja pruža besplatne usluge sajber bezbednosti.',
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'filip.kecman@thefreesecurity.com',
    contactType: 'customer service',
    availableLanguage: ['Serbian', 'English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/the-free-security/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'RS',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'The Free Security',
  url: 'https://thefreesecurity.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://thefreesecurity.com/#/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export function makeFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function makeBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://thefreesecurity.com${item.url}`,
    })),
  };
}

export function makeServiceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'The Free Security',
      url: 'https://thefreesecurity.com',
    },
    url: `https://thefreesecurity.com${url}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RSD',
      description: 'Besplatno za neprofitne organizacije, MSP i pojedince',
    },
  };
}

export function makeBlogPostSchema(post: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  slug: string;
  body: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Free Security',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thefreesecurity.com/assets/images/FreeSecSmall.svg',
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    image: post.image || 'https://thefreesecurity.com/assets/images/og-default.png',
    url: `https://thefreesecurity.com/#/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://thefreesecurity.com/#/blog/${post.slug}`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.post-speakable'],
    },
  };
}

export function makePersonSchema(person: {
  name: string;
  jobTitle: string;
  url?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: 'The Free Security',
    },
    url: person.url,
    image: person.image,
  };
}
