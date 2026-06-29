import './PageHeader.css';

/**
 * Compact page header for interior screens (index/detail pages). Smaller than
 * <Hero> — an optional eyebrow, a title, and a lead paragraph.
 *
 * @param {object} props
 * @param {string} [props.eyebrow]
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.lead]
 */
function PageHeader({ eyebrow, title, lead }) {
  return (
    <div className="page-header">
      {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
      <h1 className="page-header__title">{title}</h1>
      {lead && <p className="page-header__lead">{lead}</p>}
    </div>
  );
}

export default PageHeader;
