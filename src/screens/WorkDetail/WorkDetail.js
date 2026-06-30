import { useParams } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import Section from '../../components/Section/Section';
import AppLink from '../../components/AppLink/AppLink';
import Gallery from '../../components/Gallery/Gallery';
import InProgress from '../../components/InProgress/InProgress';
import { bySlug } from '../../content/work';
import './WorkDetail.css';

/**
 * WorkDetail — the shared, data-driven detail screen for a single project /
 * experience (/projects/:slug, /experience/:slug). Resolves
 * the item by its `:slug` and renders, top to bottom: a tagline, the title (with
 * an optional inline link out to the live product), the full-width writeup, and a
 * bottom horizontal-scroll image gallery (reusing the homepage carousel style).
 *
 * The writeup is an array of blocks: a plain string renders as a paragraph, and an
 * object `{ heading }` renders a section heading, so a long narrative can be broken
 * into scannable, decision-led sections. (A bare string writeup still works.)
 *
 * Items without authored detail copy (no `writeup`) fall back to <InProgress>, so
 * every route keeps working until its page is written.
 */
function WorkDetail() {
  const { slug } = useParams();
  const item = bySlug(slug);

  // No item, or no detail copy authored yet → keep the in-progress placeholder.
  if (!item || !item.writeup) return <InProgress />;

  const { title, tagline, link, writeup, gallery = [] } = item;
  const blocks = Array.isArray(writeup) ? writeup : [writeup];

  return (
    <Section>
      <header className="work-detail__header">
        <div className="work-detail__title-row">
          <h1 className="work-detail__title">{title}</h1>
          {link && (
            <AppLink
              href={link.href}
              external
              className="work-detail__link"
              aria-label={`Visit ${link.label || title}`}
              title={`Visit ${link.label || title}`}
            >
              <HiArrowUpRight aria-hidden="true" focusable="false" />
            </AppLink>
          )}
        </div>
        {tagline && <p className="work-detail__tagline">{tagline}</p>}
      </header>

      <div className="work-detail__writeup">
        {blocks.map((block, i) =>
          block && typeof block === 'object' && block.heading ? (
            // eslint-disable-next-line react/no-array-index-key
            <h2 key={i} className="work-detail__section-heading">
              {block.heading}
            </h2>
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <p key={i}>{block}</p>
          )
        )}
      </div>

      {gallery.length > 0 && (
        <div className="work-detail__gallery">
          <h2 className="work-detail__media-label">Screenshots</h2>
          <Gallery images={gallery} ariaLabel={`${title} gallery`} />
        </div>
      )}
    </Section>
  );
}

export default WorkDetail;
