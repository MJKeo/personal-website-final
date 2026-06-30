import Section from '../../components/Section/Section';
import PageHeader from '../../components/PageHeader/PageHeader';
import CardGrid from '../../components/CardGrid/CardGrid';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { GAMES } from '../../content/work';

/**
 * Games index — the browser games Michael has built, as a grid of cards (icon +
 * title + one-line description), mirroring the Projects/Experience layout. These
 * have no detail page: clicking a card opens the live, externally-hosted game
 * itself in a new tab (`external`).
 */
function Games() {
  return (
    <Section>
      <PageHeader
        eyebrow="The Arcade"
        title="Games"
        lead="A handful of browser games I've built for fun over the years. No promises that they are actually good but man do I like making them."
      />
      <CardGrid gap="lg">
        {GAMES.map((item) => (
          <ProjectCard
            key={item.slug}
            item={item}
            variant="compact"
            ctaLabel="Play"
            showTags={false}
            external
          />
        ))}
      </CardGrid>
    </Section>
  );
}

export default Games;
