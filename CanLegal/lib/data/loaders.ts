import copy from '@/content/copy.json';
import glossary from '@/content/glossary.json';
import countries from '@/data/countries.json';
import highlights from '@/data/highlights.json';
import sources from '@/data/sources.json';
import statistics from '@/data/statistics.json';
import timeline from '@/data/timeline.json';

import type { Country, GlossaryTerm, Highlight, SourceRef, Statistic, TimelineEvent } from './types';
import {
  validateCountries,
  validateGlossary,
  validateHighlights,
  validateStatistics,
  validateTimeline,
} from './validators';

export function getCountries() {
  const data = countries as Country[];
  validateCountries(data);
  return data;
}

export function getTimeline() {
  const data = timeline as TimelineEvent[];
  validateTimeline(data);
  return data;
}

export function getStatistics() {
  const data = statistics as Statistic[];
  validateStatistics(data);
  return data;
}

export function getHighlights() {
  const data = highlights as Highlight[];
  validateHighlights(data);
  return data;
}

export function getGlossary() {
  const data = glossary as GlossaryTerm[];
  validateGlossary(data);
  return data;
}

export function getSources() {
  return sources as SourceRef[];
}

export function getCopy() {
  return copy as typeof copy;
}
