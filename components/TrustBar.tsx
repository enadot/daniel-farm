import { useTranslations } from 'next-intl';

const items = [
  { icon: '🕊️', key: 'years' },
  { icon: '📍', key: 'location' },
  { icon: '🛡️', key: 'available' },
  { icon: '🤝', key: 'personal' },
] as const;

export default function TrustBar() {
  const t = useTranslations('trustBar');

  return (
    <section
      className="bg-white border-y border-primary-light"
      aria-label={t('aria')}
    >
      <div className="container-content py-8 md:py-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex flex-col items-center justify-center gap-2"
            >
              <span className="text-3xl md:text-4xl" aria-hidden="true">
                {item.icon}
              </span>
              <span className="text-sm md:text-base font-medium text-primary-dark">
                {t(item.key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
