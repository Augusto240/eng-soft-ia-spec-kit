import type { SourceRef } from '@/lib/data/types';

type SourcesCopy = {
  title: string;
  subtitle: string;
};

type SourcesProps = {
  sources: SourceRef[];
  copy: SourcesCopy;
};

export default function Sources({ sources, copy }: SourcesProps) {
  return (
    <section id="sources" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Sources</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sources.map((source) => (
          <article key={source.url} className="rounded-2xl border border-line/40 bg-surface/70 p-5">
            <p className="text-sm font-semibold">{source.name}</p>
            <p className="mt-2 text-xs text-muted">{source.type ?? 'Reference'}</p>
            <a
              className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-ink"
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              Visit source
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
