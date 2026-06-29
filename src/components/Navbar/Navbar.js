import AppLink from '../AppLink/AppLink';
import './Navbar.css';

/**
 * Generic sticky top navigation bar.
 *
 * Brand + nav links route client-side via <AppLink> (internal paths) and show
 * an active state on the current route. The whole nav cluster (links + actions)
 * is right-aligned.
 *
 * @param {object} props
 * @param {string} [props.logoSrc]           Brand/avatar image (e.g. "/images/app-wide/me.png").
 * @param {string} [props.siteName]          Brand text, also links home.
 * @param {string} [props.homeHref='/']      Where the brand + logo link to.
 * @param {Array<{label: string, href: string}>} [props.links]  Nav items.
 * @param {React.ReactNode} [props.actions]  Right-slot content (e.g. a Button).
 */
function Navbar({ logoSrc, siteName, homeHref = '/', links = [], actions }) {
  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Primary">
        {(logoSrc || siteName) && (
          <AppLink className="navbar__brand" href={homeHref} aria-label={siteName || 'Home'}>
            {logoSrc && <img className="navbar__avatar" src={logoSrc} alt="" aria-hidden="true" />}
            {siteName && <span className="navbar__name">{siteName}</span>}
          </AppLink>
        )}

        {links.length > 0 && (
          <ul className="navbar__links">
            {links.map(({ label, href }) => (
              <li key={label}>
                <AppLink className="navbar__link" activeClassName="navbar__link--active" href={href}>
                  {label}
                </AppLink>
              </li>
            ))}
          </ul>
        )}

        {actions && <div className="navbar__actions">{actions}</div>}
      </nav>
    </header>
  );
}

export default Navbar;
