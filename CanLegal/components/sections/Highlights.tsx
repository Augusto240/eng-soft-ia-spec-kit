import type { Highlight } from '@/lib/data/types';
import { statusChipClass } from '@/lib/constants';

const statusLabels: Record<string, string> = {
  legalized: 'Legalized',
  decriminalized: 'Decriminalized',
  medical: 'Medical',
  prohibited: 'Prohibited',
  unknown: 'Unknown',
};

type HighlightsCopy = {
  title: string;
  subtitle: string;
};

type HighlightsProps = {
  items: Highlight[];
  copy: HighlightsCopy;
};

export default function Highlights({ items, copy }: HighlightsProps) {
  return (
    <section id="highlights" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Highlights</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-line/40 bg-surface/70 p-5">
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusChipClass(item.status)}`}>
                {statusLabels[item.status] ?? 'Unknown'}
              </span>
              <span className="text-xs text-muted">{item.date}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.summary}</p>
            <p className="mt-4 text-xs text-muted">Region: {item.region}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
