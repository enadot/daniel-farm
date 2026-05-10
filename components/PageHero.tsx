type PageHeroProps = {
  title: string;
  subtitle?: string;
  emoji?: string;
};

export default function PageHero({ title, subtitle, emoji }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-bl from-primary-dark via-primary-dark to-[#0a3a30] text-white"
      aria-labelledby="page-hero-title"
    >
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, rgba(93, 202, 165, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(225, 245, 238, 0.2) 0%, transparent 50%)',
        }}
      />
      <div className="relative container-content py-20 md:py-28 text-center">
        {emoji && (
          <div className="text-5xl mb-4" aria-hidden="true">
            {emoji}
          </div>
        )}
        <h1
          id="page-hero-title"
          className="heading-xl text-white mb-4"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-primary-light/95 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
