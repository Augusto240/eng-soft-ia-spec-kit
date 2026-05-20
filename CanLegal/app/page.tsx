import Education from '@/components/sections/Education';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import Highlights from '@/components/sections/Highlights';
import Statistics from '@/components/sections/Statistics';
import StatusOverview from '@/components/sections/StatusOverview';
import Timeline from '@/components/sections/Timeline';
import {
  getCopy,
  getCountries,
  getGlossary,
  getHighlights,
  getStatistics,
  getTimeline,
} from '@/lib/data/loaders';

export default function Page() {
  const countries = getCountries();
  const timeline = getTimeline();
  const statistics = getStatistics();
  const highlights = getHighlights();
  const glossary = getGlossary();
  const copy = getCopy();

  return (
    <main id="main" className="flex flex-col gap-20 pb-24 pt-16">
      <Hero copy={copy.hero} />
      <StatusOverview countries={countries} copy={copy.overview} />
      <Highlights items={highlights} copy={copy.highlights} />
      <Statistics items={statistics} copy={copy.statistics} />
      <Timeline events={timeline} copy={copy.timeline} />
      <Education terms={glossary} copy={copy.education} />
      <Faq items={copy.faq} />
    </main>
  );
}
