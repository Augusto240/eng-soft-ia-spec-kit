import type { LegalStatus } from '@/lib/data/types';
import { STATUS_LABELS, statusChipClass } from '@/lib/constants';

type StatusBadgeProps = {
  status: LegalStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusChipClass(status)}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
