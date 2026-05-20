import type { Country, LegalStatus } from './types';

export function getContinents(countries: Country[]) {
  return Array.from(new Set(countries.map((country) => country.continent))).sort();
}

export function getStatusCounts(countries: Country[]) {
  return countries.reduce<Record<LegalStatus, number>>(
    (acc, country) => {
      acc[country.status] += 1;
      return acc;
    },
    {
      legalized: 0,
      medical_only: 0,
      decriminalized: 0,
      illegal: 0,
      restricted: 0,
      unknown: 0,
    },
  );
}
