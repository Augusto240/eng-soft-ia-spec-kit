import { describe, expect, it } from 'vitest';

import { getStatusCounts } from '@/lib/data/selectors';
import type { Country } from '@/lib/data/types';

const baseCountry = {
  name: 'Sample',
  continent: 'Europe',
  region: 'Western Europe',
  policyModel: 'Legalization',
  medical: false,
  recreational: false,
  decriminalized: false,
  industrialHemp: false,
  cultivationAllowed: false,
  possessionLimitGrams: null,
  minimumAge: null,
  yearOfLegalization: null,
  regulatoryAgency: null,
  sources: [{ name: 'Source', url: 'https://example.com' }],
  lastUpdated: '2026-05-20',
  summary: 'Summary',
  medicalAccess: 'Medical access',
  possessionRule: 'Possession rules',
  cultivationRule: 'Cultivation rules',
  tourismPolicy: 'Tourism policy',
  medicalNotes: [],
  restrictions: [],
  policyNotes: [],
  tourismNotes: [],
  culturalNotes: [],
  countryFaq: [],
  timelineEventIds: [],
  verificationStatus: 'source-linked' as const,
  confidenceLabel: 'Source-linked' as const,
};

const countries: Country[] = [
  { ...baseCountry, code: 'CA', status: 'legalized' },
  { ...baseCountry, code: 'AU', status: 'medical_only' },
  { ...baseCountry, code: 'PT', status: 'decriminalized' },
  { ...baseCountry, code: 'LU', status: 'restricted' },
];

describe('getStatusCounts', () => {
  it('counts statuses correctly', () => {
    const counts = getStatusCounts(countries);
    expect(counts.legalized).toBe(1);
    expect(counts.medical_only).toBe(1);
    expect(counts.decriminalized).toBe(1);
    expect(counts.restricted).toBe(1);
    expect(counts.illegal).toBe(0);
  });
});
