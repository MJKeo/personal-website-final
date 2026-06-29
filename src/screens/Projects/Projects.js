import Section from '../../components/Section/Section';
import PageHeader from '../../components/PageHeader/PageHeader';
import CardGrid from '../../components/CardGrid/CardGrid';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { PROJECTS } from '../../content/work';

/**
 * Projects index — Michael's projects as a grid of cards (banner + title +
 * one-sentence overview): the AI-year builds first (CineMind, then the
 * explorations), then the wider non-AI work, in homepage order. Each card links
 * to its detail route (`/projects/:slug` or `/games/:slug`), which renders
 * <InProgress> until those pages exist.
 */
function Projects() {
  return (
    <Section>
      <PageHeader
        eyebrow="The Build Log"
        title="Projects"
        lead="I love to make things, here are some of my favorites from over the years."
      />
      <CardGrid gap="lg">
        {PROJECTS.map((item) => (
          <ProjectCard
            key={item.slug}
            item={item}
            variant="compact"
            ctaLabel="Take a look"
            showTags={false}
          />
        ))}
      </CardGrid>
    </Section>
  );
}

export default Projects;
