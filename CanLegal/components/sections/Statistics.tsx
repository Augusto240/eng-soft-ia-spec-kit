'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { Statistic } from '@/lib/data/types';

type StatisticsCopy = {
  title: string;
  subtitle: string;
};

type StatisticsProps = {
  items: Statistic[];
  copy: StatisticsCopy;
};

export default function Statistics({ items, copy }: StatisticsProps) {
  const chartData = items.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  return (
    <section id="stats" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Data</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-2xl border border-line/40 bg-surface/70 p-6">
          <div className="h-64 w-full">
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
                <Bar dataKey="value" fill="rgb(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
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
