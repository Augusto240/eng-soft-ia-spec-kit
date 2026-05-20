type HeroCopy = {
  title: string;
  subtitle: string;
  disclaimer: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: { label: string; value: string }[];
};

type HeroProps = {
  copy: HeroCopy;
};

export default function Hero({ copy }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-line/40 bg-surface/80 px-8 py-16 shadow-soft">
      <div className="absolute inset-0 bg-hero-glow opacity-80" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-muted">Global policy education</p>
          <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">{copy.title}</h1>
          <p className="mt-6 text-lg text-muted md:text-xl">{copy.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-surface"
              href={copy.primaryCta.href}
            >
              {copy.primaryCta.label}
            </a>
            <a
              className="rounded-full border border-line/60 px-6 py-3 text-sm font-semibold text-ink"
              href={copy.secondaryCta.href}
            >
              {copy.secondaryCta.label}
            </a>
          </div>
          <p className="mt-6 text-xs text-muted">{copy.disclaimer}</p>
        </div>
        <div className="grid gap-4">
          {copy.stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-line/40 bg-surface/70 p-6">
              <p className="text-3xl font-display">{item.value}</p>
              <p className="mt-2 text-sm text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
