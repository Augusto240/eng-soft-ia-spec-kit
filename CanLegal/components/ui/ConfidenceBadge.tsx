type ConfidenceBadgeProps = {
  label: string;
};

const LABEL_CLASS: Record<string, string> = {
  Verified: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200',
  'Source-linked': 'bg-sky-100 text-sky-900 dark:bg-sky-500/20 dark:text-sky-200',
  'Needs Verification': 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200',
  'Partial Information': 'bg-violet-100 text-violet-900 dark:bg-violet-500/20 dark:text-violet-200',
  'Region-specific': 'bg-slate-100 text-slate-900 dark:bg-slate-500/20 dark:text-slate-200',
};

export default function ConfidenceBadge({ label }: ConfidenceBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${LABEL_CLASS[label] ?? ''}`}>
      {label}
    </span>
  );
}
