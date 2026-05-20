import type {
  Country,
  GlossaryTerm,
  Highlight,
  Statistic,
  TimelineEvent,
} from './types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

export function validateCountries(countries: Country[]) {
  countries.forEach((country) => {
    assert(Boolean(country.code), 'Country code is required');
    assert(Boolean(country.name), 'Country name is required');
    assert(Boolean(country.continent), 'Country continent is required');
    assert(Boolean(country.region), 'Country region is required');
    assert(Boolean(country.status), 'Country status is required');
    assert(Boolean(country.lastUpdated), 'Country lastUpdated is required');
    assert(Array.isArray(country.sources), 'Country sources must be an array');
    assert(Boolean(country.summary), 'Country summary is required');
  });
}

export function validateTimeline(events: TimelineEvent[]) {
  events.forEach((event) => {
    assert(Boolean(event.id), 'Timeline event id is required');
    assert(Boolean(event.title), 'Timeline event title is required');
    assert(Array.isArray(event.countryCodes), 'Timeline event countryCodes must be an array');
    assert(Array.isArray(event.sources), 'Timeline event sources must be an array');
  });
}

export function validateStatistics(stats: Statistic[]) {
  stats.forEach((stat) => {
    assert(Boolean(stat.id), 'Statistic id is required');
    assert(Boolean(stat.label), 'Statistic label is required');
  });
}

export function validateHighlights(highlights: Highlight[]) {
  highlights.forEach((item) => {
    assert(Boolean(item.id), 'Highlight id is required');
    assert(Boolean(item.title), 'Highlight title is required');
    assert(Array.isArray(item.sources), 'Highlight sources must be an array');
  });
}

export function validateGlossary(terms: GlossaryTerm[]) {
  terms.forEach((term) => {
    assert(Boolean(term.id), 'Glossary id is required');
    assert(Boolean(term.term), 'Glossary term is required');
  });
}
