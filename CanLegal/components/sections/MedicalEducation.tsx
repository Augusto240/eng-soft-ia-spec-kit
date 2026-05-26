import ConfidenceBadge from '@/components/ui/ConfidenceBadge';

type MedicalItem = {
  title: string;
  summary: string;
  confidence: string;
};

type MedicalCopy = {
  title: string;
  subtitle: string;
  items: MedicalItem[];
};

type MedicalEducationProps = {
  copy: MedicalCopy;
};

export default function MedicalEducation({ copy }: MedicalEducationProps) {
  return (
    <section id="medical" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Medical access</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
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
