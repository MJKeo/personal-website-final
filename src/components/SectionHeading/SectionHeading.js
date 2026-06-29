import './SectionHeading.css';

/**
 * Section heading block — an optional eyebrow label, a title, and an optional
 * lead paragraph. Reused at the top of most content sections.
 *
 * @param {object} props
 * @param {string} [props.eyebrow]  Small uppercase kicker above the title.
 * @param {React.ReactNode} [props.title]
 * @param {React.ReactNode} [props.lead]  Supporting paragraph under the title.
 * @param {'left'|'center'} [props.align='left']
 */
function SectionHeading({ eyebrow, title, lead, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      {title && <h2 className="section-heading__title">{title}</h2>}
      {lead && <p className="section-heading__lead">{lead}</p>}
    </div>
  );
}

export default SectionHeading;
