import ConfidenceBadge from '@/components/ui/ConfidenceBadge';

type CulturalItem = {
  title: string;
  summary: string;
  confidence: string;
};

type CulturalCopy = {
  title: string;
  subtitle: string;
  items: CulturalItem[];
};

type CulturalInsightsProps = {
  copy: CulturalCopy;
};

export default function CulturalInsights({ copy }: CulturalInsightsProps) {
  return (
    <section id="culture" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Culture and tourism</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {copy.items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-line/40 bg-surface/70 p-5">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-muted">{item.summary}</p>
            <div className="mt-4">
              <ConfidenceBadge label={item.confidence} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
