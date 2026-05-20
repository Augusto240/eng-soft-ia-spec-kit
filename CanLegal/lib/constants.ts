import type { LegalStatus } from './data/types';

export const STATUS_LABELS: Record<LegalStatus, string> = {
  legalized: 'Legalized',
  medical_only: 'Medical only',
  decriminalized: 'Decriminalized',
  illegal: 'Illegal',
  restricted: 'Restricted / experimental',
  unknown: 'Unknown',
};

export const STATUS_OPTIONS: { value: LegalStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'legalized', label: STATUS_LABELS.legalized },
  { value: 'medical_only', label: STATUS_LABELS.medical_only },
  { value: 'decriminalized', label: STATUS_LABELS.decriminalized },
  { value: 'illegal', label: STATUS_LABELS.illegal },
  { value: 'restricted', label: STATUS_LABELS.restricted },
];

const STATUS_COLOR_HEX: Record<LegalStatus, string> = {
  legalized: '#1f8a5b',
  medical_only: '#3b6ea8',
  decriminalized: '#d19a2c',
  illegal: '#b9484c',
  restricted: '#7c58c2',
  unknown: '#6b7280',
};

export function statusColorHex(status: LegalStatus) {
  return STATUS_COLOR_HEX[status] ?? STATUS_COLOR_HEX.unknown;
}

export function statusChipClass(status: LegalStatus) {
  switch (status) {
    case 'legalized':
      return 'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200';
    case 'medical_only':
      return 'bg-sky-100 text-sky-900 dark:bg-sky-500/20 dark:text-sky-200';
    case 'decriminalized':
      return 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200';
    case 'illegal':
      return 'bg-rose-100 text-rose-900 dark:bg-rose-500/20 dark:text-rose-200';
    case 'restricted':
      return 'bg-violet-100 text-violet-900 dark:bg-violet-500/20 dark:text-violet-200';
    default:
      return 'bg-slate-100 text-slate-900 dark:bg-slate-500/20 dark:text-slate-200';
  }
}

export function flagBadgeClass(enabled: boolean) {
  return enabled
    ? 'bg-ink text-surface'
    : 'border border-line/60 text-muted';
}
