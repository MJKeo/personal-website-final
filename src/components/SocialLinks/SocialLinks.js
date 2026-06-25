import './SocialLinks.css';

/**
 * Generic row of icon links (social profiles, stores, etc.).
 * The caller supplies the data, so this stays reusable anywhere.
 *
 * @param {object} props
 * @param {Array<{label: string, href: string, icon: React.ComponentType}>} props.links
 * @param {string} [props.className]
 */
function SocialLinks({ links = [], className = '' }) {
  return (
    <ul className={`social-links${className ? ` ${className}` : ''}`}>
      {links.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            className="social-links__link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
          >
            <Icon aria-hidden="true" focusable="false" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
