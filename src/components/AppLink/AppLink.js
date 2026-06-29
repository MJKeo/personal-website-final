import { NavLink } from 'react-router-dom';

/**
 * Smart link primitive. Centralizes the "internal route vs. external/file"
 * decision so every other component (Navbar, Button, cards) stays router-aware
 * without repeating the logic.
 *
 *   - Internal app routes (e.g. "/projects")        → client-side <NavLink>.
 *   - External URLs, mailto:, hashes, or files      → plain <a> (safe new-tab
 *     rel when `external`).
 *
 * Forwards `className` and children, so callers can style it however they like
 * (e.g. Button passes its `btn` classes straight through).
 *
 * @param {object} props
 * @param {string} props.href
 * @param {boolean} [props.external]   Force a new tab + rel safety for an <a>.
 * @param {string}  [props.className]
 * @param {string}  [props.activeClassName]  Class applied when an internal route is active.
 */
function isInternal(href = '') {
  return href.startsWith('/') && !href.startsWith('//') && !/\.[a-z0-9]+$/i.test(href);
}

function AppLink({ href = '', external = false, className = '', activeClassName = '', children, ...rest }) {
  if (isInternal(href)) {
    return (
      <NavLink
        to={href}
        end={href === '/'}
        className={({ isActive }) =>
          [className, isActive ? activeClassName : ''].filter(Boolean).join(' ')
        }
        {...rest}
      >
        {children}
      </NavLink>
    );
  }

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a className={className} href={href} {...externalProps} {...rest}>
      {children}
    </a>
  );
}

export default AppLink;
