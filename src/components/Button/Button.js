import AppLink from '../AppLink/AppLink';
import './Button.css';

/**
 * Generic button / link.
 *
 * Renders an <a>/<NavLink> (via <AppLink>) when `href` is provided, otherwise a
 * <button>. Internal routes become client-side links automatically. Styling is
 * driven entirely by the Fern semantic tokens, so it themes automatically.
 *
 * @param {object}   props
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary']
 * @param {string}   [props.href]      When set, renders a link.
 * @param {boolean}  [props.external]  Opens external links in a new tab (adds rel safety).
 * @param {React.ReactNode} props.children
 */
function Button({ variant = 'primary', href, external = false, className = '', children, ...rest }) {
  const classes = `btn btn--${variant}${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <AppLink className={classes} href={href} external={external} {...rest}>
        {children}
      </AppLink>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
