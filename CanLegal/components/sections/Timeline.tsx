import type { TimelineEvent } from '@/lib/data/types';
import { statusChipClass } from '@/lib/constants';

const statusLabels: Record<string, string> = {
  legalized: 'Legalized',
  decriminalized: 'Decriminalized',
  medical: 'Medical',
  prohibited: 'Prohibited',
  unknown: 'Unknown',
};

type TimelineCopy = {
  title: string;
  subtitle: string;
};

type TimelineProps = {
  events: TimelineEvent[];
  copy: TimelineCopy;
};

export default function Timeline({ events, copy }: TimelineProps) {
  return (
    <section id="timeline" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Timeline</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <ol className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <li key={event.id} className="rounded-2xl border border-line/40 bg-surface/70 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{event.year}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusChipClass(event.status)}`}>
                {statusLabels[event.status] ?? 'Unknown'}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{event.title}</h3>
            <p className="mt-2 text-sm text-muted">{event.summary}</p>
            <p className="mt-4 text-xs text-muted">Region: {event.region}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
