type SectionCardProps = {
  title: string;
  atmosphere: string;
  description: string;
  features: string[];
  emoji: string;
  includedLabel: string;
};

export default function SectionCard({
  title,
  atmosphere,
  description,
  features,
  emoji,
  includedLabel,
}: SectionCardProps) {
  return (
    <article className="card flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-16 h-16 rounded-card bg-primary-light flex items-center justify-center text-4xl flex-shrink-0"
          aria-hidden="true"
        >
          {emoji}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary-dark">{title}</h3>
          <p className="text-primary text-sm font-medium mt-1">{atmosphere}</p>
        </div>
      </div>
      <p className="text-text/80 leading-relaxed mb-5">{description}</p>
      <div className="mt-auto">
        <h4 className="text-sm font-bold text-primary-dark mb-2">{includedLabel}</h4>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-text/80"
            >
              <span className="text-primary mt-1" aria-hidden="true">
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
