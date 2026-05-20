import PolicyCard from '@/components/cards/PolicyCard';
import type { GlossaryTerm } from '@/lib/data/types';

type EducationCopy = {
  title: string;
  subtitle: string;
};

type EducationProps = {
  terms: GlossaryTerm[];
  copy: EducationCopy;
};

export default function Education({ terms, copy }: EducationProps) {
  return (
    <section id="education" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Concepts</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {terms.map((term) => (
          <PolicyCard key={term.id} title={term.term} description={term.definition} />
        ))}
      </div>
    </section>
  );
}
