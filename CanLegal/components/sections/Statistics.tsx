'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import AnimatedNumber from '@/components/ui/AnimatedNumber';
import { STATUS_LABELS, statusColorHex } from '@/lib/constants';
import { getContinentCounts, getStatusCounts } from '@/lib/data/selectors';
import type { Country, LegalStatus, Statistic } from '@/lib/data/types';

type StatisticsCopy = {
  title: string;
  subtitle: string;
};

type StatisticsProps = {
  items: Statistic[];
  countries: Country[];
  copy: StatisticsCopy;
};

export default function Statistics({ items, countries, copy }: StatisticsProps) {
  const statusCounts = getStatusCounts(countries);
  const continentCounts = getContinentCounts(countries);
  const chartData: { key: LegalStatus; label: string; value: number }[] = [
    { key: 'legalized', label: STATUS_LABELS.legalized, value: statusCounts.legalized },
    { key: 'medical_only', label: STATUS_LABELS.medical_only, value: statusCounts.medical_only },
    { key: 'decriminalized', label: STATUS_LABELS.decriminalized, value: statusCounts.decriminalized },
    { key: 'restricted', label: STATUS_LABELS.restricted, value: statusCounts.restricted },
    { key: 'illegal', label: STATUS_LABELS.illegal, value: statusCounts.illegal },
  ];

  return (
    <section id="stats" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Data</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-2xl border border-line/40 bg-surface/70 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-line/40 bg-surface/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Countries tracked</p>
              <p className="mt-2 font-display text-3xl">
                <AnimatedNumber value={countries.length} />
              </p>
            </div>
            <div className="rounded-2xl border border-line/40 bg-surface/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Medical access</p>
              <p className="mt-2 font-display text-3xl">
                <AnimatedNumber value={statusCounts.medical_only + statusCounts.legalized} />
              </p>
            </div>
            <div className="rounded-2xl border border-line/40 bg-surface/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Legalized</p>
              <p className="mt-2 font-display text-3xl">
                <AnimatedNumber value={statusCounts.legalized} />
              </p>
            </div>
            <div className="rounded-2xl border border-line/40 bg-surface/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Restricted</p>
              <p className="mt-2 font-display text-3xl">
                <AnimatedNumber value={statusCounts.restricted} />
              </p>
            </div>
          </div>
          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="rgb(var(--line))" strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fill: 'rgb(var(--muted))', fontSize: 12 }} />
                <YAxis tick={{ fill: 'rgb(var(--muted))', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgb(var(--highlight))' }}
                  contentStyle={{
                    background: 'rgb(var(--surface))',
                    borderRadius: '12px',
                    border: '1px solid rgb(var(--line))',
                    color: 'rgb(var(--ink))',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell key={entry.key} fill={statusColorHex(entry.key)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-muted">
            Counts are derived from the current dataset and should be verified against official sources.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-line/40 bg-surface/70 p-5">
              <p className="text-sm text-muted">{item.label}</p>
              <p className="mt-2 font-display text-3xl">
                {item.value} <span className="text-base text-muted">{item.unit}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-line/40 bg-surface/70 p-5">
            <p className="text-sm text-muted">Continent summary</p>
            <div className="mt-3 grid gap-2 text-sm text-muted">
              {Object.entries(continentCounts).map(([continent, count]) => (
                <div key={continent} className="flex items-center justify-between">
                  <span>{continent}</span>
                  <span className="text-ink">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <noscript>
        <p className="text-sm text-muted">
          Charts require JavaScript. The key metrics are still listed above.
        </p>
      </noscript>
    </section>
  );
}
