import type { Country, LegalStatus } from './data/types';

type FilterInput = {
  status: LegalStatus | 'all';
  continent: string;
  query: string;
  medical: boolean;
  recreational: boolean;
};

export function filterCountries(countries: Country[], filters: FilterInput) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return countries.filter((country) => {
    const matchesStatus = filters.status === 'all' || country.status === filters.status;
    const matchesContinent = filters.continent === 'all' || country.continent === filters.continent;
    const matchesMedical = !filters.medical || country.medical;
    const matchesRecreational = !filters.recreational || country.recreational;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      country.name.toLowerCase().includes(normalizedQuery) ||
      country.code.toLowerCase().includes(normalizedQuery) ||
      country.region.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesContinent && matchesMedical && matchesRecreational && matchesQuery;
  });
}
