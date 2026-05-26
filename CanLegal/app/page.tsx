import Education from '@/components/sections/Education';
import Faq from '@/components/sections/Faq';
import FeaturedCountries from '@/components/sections/FeaturedCountries';
import Hero from '@/components/sections/Hero';
import Highlights from '@/components/sections/Highlights';
import MedicalEducation from '@/components/sections/MedicalEducation';
import Sources from '@/components/sections/Sources';
import Statistics from '@/components/sections/Statistics';
import StatusOverview from '@/components/sections/StatusOverview';
import Timeline from '@/components/sections/Timeline';
import CulturalInsights from '@/components/sections/CulturalInsights';
import {
  getCopy,
  getCountries,
  getGlossary,
  getHighlights,
  getSources,
  getStatistics,
  getTimeline,
} from '@/lib/data/loaders';

export default function Page() {
  const countries = getCountries();
  const timeline = getTimeline();
  const statistics = getStatistics();
  const highlights = getHighlights();
  const glossary = getGlossary();
  const sources = getSources();
  const copy = getCopy();

  return (
    <main id="main" className="flex flex-col gap-20 pb-24 pt-16">
      <Hero copy={copy.hero} />
      <StatusOverview countries={countries} copy={copy.overview} />
      <FeaturedCountries countries={countries} copy={copy.featured} />
      <Highlights items={highlights} copy={copy.highlights} />
      <Statistics items={statistics} countries={countries} copy={copy.statistics} />
      <Timeline events={timeline} copy={copy.timeline} />
      <MedicalEducation copy={copy.medicalEducation} />
      <Education terms={glossary} copy={copy.education} />
      <CulturalInsights copy={copy.culturalInsights} />
      <Sources sources={sources} copy={copy.sources} />
      <Faq items={copy.faq} />
    </main>
  );
}
