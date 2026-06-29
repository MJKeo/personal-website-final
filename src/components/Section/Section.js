import './Section.css';

/**
 * Generic page section — a centered, max-width content band with consistent
 * vertical rhythm. Every screen composes its content out of <Section>s so
 * spacing and width stay uniform site-wide.
 *
 * @param {object} props
 * @param {'default'|'wide'|'narrow'} [props.width='default']  Max content width.
 * @param {boolean} [props.muted=false]  Use the subtle alternate background band.
 * @param {string}  [props.as='section']  Element/tag to render.
 * @param {string}  [props.id]            Anchor id.
 */
function Section({ width = 'default', muted = false, as: Tag = 'section', id, className = '', children }) {
  const band = `section${muted ? ' section--muted' : ''}${className ? ` ${className}` : ''}`;
  return (
    <Tag className={band} id={id}>
      <div className={`section__inner section__inner--${width}`}>{children}</div>
    </Tag>
  );
}

export default Section;
