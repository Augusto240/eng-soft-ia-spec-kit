import Link from 'next/link';
import { notFound } from 'next/navigation';

import ConfidenceBadge from '@/components/ui/ConfidenceBadge';
import FlagBadge from '@/components/ui/FlagBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import { getCountries, getTimeline } from '@/lib/data/loaders';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getCountries().map((country) => ({ code: country.code.toLowerCase() }));
}

export function generateMetadata({ params }: { params: { code: string } }) {
  const country = getCountries().find(
    (item) => item.code.toLowerCase() === params.code.toLowerCase(),
  );

  if (!country) {
    return buildMetadata({
      title: 'Country not found',
      description: 'No data available for this country.',
      path: `/countries/${params.code}`,
    });
  }

  return buildMetadata({
    title: `${country.name} policy overview`,
    description: `Educational overview of ${country.name} cannabis policy status and summary.`,
    path: `/countries/${country.code.toLowerCase()}`,
  });
}

export default function CountryPage({ params }: { params: { code: string } }) {
  const country = getCountries().find(
    (item) => item.code.toLowerCase() === params.code.toLowerCase(),
  );
  const timeline = getTimeline().filter((event) =>
    event.countryCodes.includes(params.code.toUpperCase()),
  );

  if (!country) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 py-16">
      <Link className="text-sm text-muted" href="/">
        Back to overview
      </Link>
      <section className="rounded-3xl border border-line/40 bg-surface/80 p-8 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-muted">Country profile</p>
            <h1 className="mt-3 font-display text-4xl">{country.name}</h1>
            <p className="mt-2 text-muted">{country.region}</p>
          </div>
          <StatusBadge status={country.status} />
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{country.policyModel}</p>
        <p className="mt-4 text-sm text-muted">{country.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <FlagBadge label="Medical" enabled={country.medical} />
          <FlagBadge label="Recreational" enabled={country.recreational} />
          <FlagBadge label="Decrim" enabled={country.decriminalized} />
          <FlagBadge label="Cultivation" enabled={country.cultivationAllowed} />
          <FlagBadge label="Hemp" enabled={country.industrialHemp} />
        </div>
        <div className="mt-4">
          <ConfidenceBadge label={country.confidenceLabel} />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line/40 bg-surface/70 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Key facts</h2>
          <dl className="mt-4 grid gap-3 text-sm text-muted">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Minimum age</dt>
              <dd className="text-ink">{country.minimumAge ?? 'Varies / verify'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Possession limit</dt>
              <dd className="text-ink">
                {country.possessionLimitGrams ?? 'Varies / verify'}
                {country.possessionLimitGrams ? ' g' : ''}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Regulatory agency</dt>
              <dd className="text-ink">{country.regulatoryAgency ?? 'Not specified'}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Last updated</dt>
              <dd className="text-ink">{country.lastUpdated}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted">Verification</dt>
              <dd className="text-ink">{country.verificationStatus}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border border-line/40 bg-surface/70 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Access rules</h2>
          <p className="mt-4 text-sm text-muted">Medical access: {country.medicalAccess}</p>
          <p className="mt-3 text-sm text-muted">Possession: {country.possessionRule}</p>
          <p className="mt-3 text-sm text-muted">Cultivation: {country.cultivationRule}</p>
          <p className="mt-3 text-sm text-muted">Tourism: {country.tourismPolicy}</p>
          <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Policy notes</h3>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            {country.policyNotes.length === 0 ? (
              <li>No notes available.</li>
            ) : (
              country.policyNotes.map((note) => <li key={note}>{note}</li>)
            )}
          </ul>
          <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Medical notes
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {country.medicalNotes.length === 0 ? (
              <li>No medical notes listed.</li>
            ) : (
              country.medicalNotes.map((note) => <li key={note}>{note}</li>)
            )}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line/40 bg-surface/70 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Cultural context</h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            {country.culturalNotes.length === 0 ? (
              <li>No cultural context listed.</li>
            ) : (
              country.culturalNotes.map((item) => <li key={item}>{item}</li>)
            )}
          </ul>
        </div>
        <div className="rounded-2xl border border-line/40 bg-surface/70 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Tourism notes</h2>
          <ul className="mt-4 grid gap-2 text-sm text-muted">
            {country.tourismNotes.length === 0 ? (
              <li>No tourism notes listed.</li>
            ) : (
              country.tourismNotes.map((item) => <li key={item}>{item}</li>)
            )}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-line/40 bg-surface/70 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Restrictions</h2>
        <ul className="mt-4 grid gap-2 text-sm text-muted">
          {country.restrictions.length === 0 ? (
            <li>No restrictions listed.</li>
          ) : (
            country.restrictions.map((item) => <li key={item}>{item}</li>)
          )}
        </ul>
      </section>

      <section className="rounded-2xl border border-line/40 bg-surface/70 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Timeline</h2>
        <ul className="mt-4 grid gap-3 text-sm text-muted">
          {timeline.length === 0 ? (
            <li>No timeline events linked yet.</li>
          ) : (
            timeline.map((event) => (
              <li key={event.id} className="rounded-xl border border-line/40 bg-surface/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{event.year}</p>
                <p className="mt-2 text-ink">{event.title}</p>
                <p className="mt-1 text-xs text-muted">{event.summary}</p>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="rounded-2xl border border-line/40 bg-surface/70 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">FAQs</h2>
        <div className="mt-4 grid gap-3 text-sm text-muted">
          {country.countryFaq.length === 0 ? (
            <p>No country-specific FAQs yet.</p>
          ) : (
            country.countryFaq.map((item) => (
              <div key={item.question} className="rounded-xl border border-line/40 bg-surface/80 p-4">
                <p className="text-sm font-semibold text-ink">{item.question}</p>
                <p className="mt-2 text-sm text-muted">{item.answer}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-line/40 bg-surface/70 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Official sources</h2>
        <ul className="mt-4 grid gap-2 text-sm text-muted">
          {country.sources.map((source) => (
            <li key={source.url}>
              <a className="text-ink underline" href={source.url} target="_blank" rel="noreferrer">
                {source.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
