import { describe, expect, it } from 'vitest';

import { filterCountries } from '@/lib/filters';
import type { Country } from '@/lib/data/types';

const baseCountry = {
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
  medicalAccess: 'Medical access summary',
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
  {
    ...baseCountry,
    code: 'CA',
    name: 'Canada',
    continent: 'North America',
    region: 'Northern America',
    status: 'legalized',
    medical: true,
    recreational: true,
  },
  {
    ...baseCountry,
    code: 'PT',
    name: 'Portugal',
    continent: 'Europe',
    region: 'Southern Europe',
    status: 'decriminalized',
    medical: true,
  },
];

describe('filterCountries', () => {
  it('filters by status', () => {
    const result = filterCountries(countries, {
      status: 'legalized',
      continent: 'all',
      query: '',
      medical: false,
      recreational: false,
    });

    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('CA');
  });

  it('filters by medical and recreational flags', () => {
    const result = filterCountries(countries, {
      status: 'all',
      continent: 'all',
      query: '',
      medical: true,
      recreational: true,
    });

    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('CA');
  });

  it('filters by continent and query', () => {
    const result = filterCountries(countries, {
      status: 'all',
      continent: 'Europe',
      query: 'south',
      medical: false,
      recreational: false,
    });

    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('PT');
  });
});
