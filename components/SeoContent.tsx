'use client';

import { useState } from 'react';
import { useTranslations, useMessages } from 'next-intl';

type SeoMessages = {
  seoContent: {
    sections: { title: string; paragraphs: string[] }[];
    faq: { question: string; answer: string }[];
  };
};

export default function SeoContent() {
  const t = useTranslations('seoContent');
  const messages = useMessages() as unknown as SeoMessages;
  const sections = messages.seoContent.sections;
  const faq = messages.seoContent.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="seo-content-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-content max-w-4xl">
        <header className="mb-12 text-center">
          <h2 id="seo-content-title" className="heading-lg mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-text/80 leading-relaxed max-w-3xl mx-auto">
            {t('lead')}
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <article key={section.title}>
              <h3 className="text-2xl font-bold text-primary-dark mb-4">
                {section.title}
              </h3>
              <div className="space-y-4 text-text/85 leading-relaxed">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="heading-md text-center mb-8">{t('faqTitle')}</h3>
          <ul className="space-y-3">
            {faq.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <li
                  key={item.question}
                  className="bg-primary-light/40 rounded-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 text-start p-5 hover:bg-primary-light/60 transition-colors"
                  >
                    <span className="font-semibold text-primary-dark text-lg leading-snug">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex-shrink-0 w-8 h-8 rounded-full bg-white text-primary-dark flex items-center justify-center text-xl transition-transform ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-panel-${i}`}
                      className="px-5 pb-5 text-text/85 leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
