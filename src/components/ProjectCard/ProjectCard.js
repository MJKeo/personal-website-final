import AppLink from '../AppLink/AppLink';
import Thumbnail from '../Thumbnail/Thumbnail';
import { TagList } from '../Tag/Tag';
import './ProjectCard.css';

/**
 * Project / experience card — the site's primary evidence unit.
 *
 * Variants:
 *   'feature'  large flagship card: thumbnail, eyebrow, title, subtitle,
 *              summary, proof bullets, tags. Used for CineMind / Meta / Home Depot.
 *   'compact'  small card: thumbnail, title, summary, tags. Used for the
 *              "smaller paths" grid and index screens.
 *
 * The whole card is a single link to `item.href` (an internal route → client-side).
 *
 * @param {object} props
 * @param {object} props.item       A FLAGSHIPS/EXPLORATIONS entry (see content/work.js).
 * @param {'feature'|'compact'} [props.variant='compact']
 * @param {string} [props.ctaLabel='View details']
 * @param {boolean} [props.showTags=true]  Render the item's tags chips on the card.
 */
function ProjectCard({ item, variant = 'compact', ctaLabel = 'View details', showTags = true }) {
  const { href, eyebrow, title, subtitle, summary, cover, bullets = [], tags = [] } = item;
  const isFeature = variant === 'feature';

  return (
    <AppLink href={href} className={`project-card project-card--${variant}`}>
      <div className="project-card__media">
        <Thumbnail src={cover} label={title} ratio={isFeature ? '16/9' : '4/3'} />
      </div>

      <div className="project-card__body">
        {eyebrow && <p className="project-card__eyebrow">{eyebrow}</p>}
        <h3 className="project-card__title">{title}</h3>
        {isFeature && subtitle && <p className="project-card__subtitle">{subtitle}</p>}
        {summary && <p className="project-card__summary">{summary}</p>}

        {isFeature && bullets.length > 0 && (
          <ul className="project-card__bullets">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}

        {showTags && tags.length > 0 && (
          <div className="project-card__tags">
            <TagList items={tags} />
          </div>
        )}

        <span className="project-card__cta" aria-hidden="true">
          {ctaLabel} &rarr;
        </span>
      </div>
    </AppLink>
  );
}

export default ProjectCard;
