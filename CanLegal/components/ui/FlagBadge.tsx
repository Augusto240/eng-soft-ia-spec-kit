import { flagBadgeClass } from '@/lib/constants';

type FlagBadgeProps = {
  label: string;
  enabled: boolean;
};

export default function FlagBadge({ label, enabled }: FlagBadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${flagBadgeClass(enabled)}`}>
      {label}
    </span>
  );
}
