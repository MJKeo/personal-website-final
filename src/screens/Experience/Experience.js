import Section from '../../components/Section/Section';
import PageHeader from '../../components/PageHeader/PageHeader';
import CardGrid from '../../components/CardGrid/CardGrid';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { EXPERIENCES } from '../../content/work';

/**
 * Experience index — Michael's professional work history as a grid of company
 * cards (banner + title + one-sentence overview). Each card links to its detail
 * route (`/experience/:slug`), which renders <InProgress> until those pages exist.
 */
function Experience() {
  return (
    <Section>
      <PageHeader
        eyebrow="The Track Record"
        title="Experience"
        lead="From shipping at billion-user scale to building zero-to-one at startups, the roles that shaped how I work."
      />
      <CardGrid gap="lg">
        {EXPERIENCES.map((item) => (
          <ProjectCard
            key={item.slug}
            item={item}
            variant="compact"
            ctaLabel="Learn more"
            coverRatio="16/9"
            showTags={false}
          />
        ))}
      </CardGrid>
    </Section>
  );
}

export default Experience;
