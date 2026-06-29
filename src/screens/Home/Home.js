import { useState } from 'react';
import Hero from '../../components/Hero/Hero';
import AppLink from '../../components/AppLink/AppLink';
import Section from '../../components/Section/Section';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import CardCarousel from '../../components/CardCarousel/CardCarousel';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ParticleField from '../../components/ParticleField/ParticleField';
import ParticleControls from '../../components/ParticleControls/ParticleControls';
import { IDENTITY } from '../../content/site';
import { FLAGSHIPS, EXPLORATIONS, EARLIER_WORK } from '../../content/work';
import './Home.css';

/* Picker icons as SVGs on one shared 24×24 box, so every option is identically
   sized (matching the star) and perfectly centered — font glyphs are not. */
const ICON = {
  // The resting "secret" icon on the trigger circle (was the old "none" icon).
  secret: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 1 14.26 9.74 23 12 14.26 14.26 12 23 9.74 14.26 1 12 9.74 9.74Z" fill="currentColor" />
    </svg>
  ),
  off: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <line x1="5.3" y1="5.3" x2="18.7" y2="18.7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  circle: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
    </svg>
  ),
  square: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" fill="currentColor" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M12 1 14.91 8 22.45 8.6 16.71 13.53 18.47 20.9 12 16.95 5.53 20.9 7.29 13.53 1.55 8.6 9.09 8Z"
        fill="currentColor"
      />
    </svg>
  ),
  banana: <img src="/images/home-page/banana.png" alt="" />,
};

/** Background-particle shapes offered by the picker (default: off → "no" sign). */
const PARTICLE_OPTIONS = [
  { value: 'off', label: 'Off', icon: ICON.off },
  { value: 'circle', label: 'Circle', icon: ICON.circle },
  { value: 'square', label: 'Square', icon: ICON.square },
  { value: 'star', label: 'Star', icon: ICON.star },
  { value: 'image', label: 'Banana', icon: ICON.banana },
];

/**
 * Home — the persuasive homepage.
 *
 * Per the IA spec: state one clear professional argument (hero), support it with
 * the three strongest pieces of evidence (CineMind, Meta, Home Depot), then
 * offer progressively smaller paths into the broader AI/product work.
 */
function Home() {
  const [particleShape, setParticleShape] = useState('off');

  return (
    <>
      <div className="home__hero-stage">
        <ParticleField className="home__particles" shape={particleShape} imageSrc="/images/home-page/banana.png" />
        <ParticleControls
          value={particleShape}
          onChange={setParticleShape}
          options={PARTICLE_OPTIONS}
          triggerIcon={ICON.secret}
          ariaLabel="Background particles"
        />
        <Section width="narrow" className="home__hero-band">
          <Hero
            avatar={IDENTITY.avatar}
            title={IDENTITY.name}
            subtitle={IDENTITY.tagline}
            lead={IDENTITY.pitch}
          />
        </Section>

        <Section className="home__evidence">
          <SectionHeading eyebrow="The Proof" title="Key Experiences" />
          <div className="home__flagships">
            {FLAGSHIPS.map((item) => (
              <ProjectCard
                key={item.slug}
                item={item}
                variant="feature"
                ctaLabel="Learn more"
              />
            ))}
          </div>
          <div className="home__flagships-cta">
            <AppLink href="/experience" className="home__evidence-link">
              More experiences &rarr;
            </AppLink>
          </div>
        </Section>
      </div>

      <Section muted className="home__projects">
        <SectionHeading
          eyebrow="LLM Engineering"
          title="AI-Native Applications"
        />
        <CardCarousel ariaLabel="LLM engineering projects">
          {EXPLORATIONS.map((item) => (
            <ProjectCard key={item.slug} item={item} variant="compact" ctaLabel="Take a look" showTags={false} />
          ))}
        </CardCarousel>
      </Section>

      <Section className="home__projects">
        <SectionHeading
          eyebrow="The Wider Portfolio"
          title="Apps, Games & Research"
        />
        <CardCarousel ariaLabel="Apps, games, and research projects">
          {EARLIER_WORK.map((item) => (
            <ProjectCard key={item.slug} item={item} variant="compact" ctaLabel="Take a look" />
          ))}
        </CardCarousel>
      </Section>
    </>
  );
}

export default Home;
