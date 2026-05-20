type PolicyCardProps = {
  title: string;
  description: string;
};

export default function PolicyCard({ title, description }: PolicyCardProps) {
  return (
    <article className="rounded-2xl border border-line/40 bg-surface/70 p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </article>
  );
}
