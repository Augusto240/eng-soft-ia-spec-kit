type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  items: FaqItem[];
};

export default function Faq({ items }: FaqProps) {
  return (
    <section id="faq" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">FAQ</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Questions answered</h2>
        <p className="mt-3 text-muted">Clear guidance on scope, data, and usage.</p>
      </div>
      <div className="grid gap-3">
        {items.map((item) => (
          <details key={item.question} className="rounded-2xl border border-line/40 bg-surface/70 p-5">
            <summary className="cursor-pointer text-sm font-semibold text-ink">
              {item.question}
            </summary>
            <p className="mt-3 text-sm text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
