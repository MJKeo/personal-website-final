import './Button.css';

/**
 * Generic button / link.
 *
 * Renders an <a> when `href` is provided, otherwise a <button>. Styling is
 * driven entirely by the Fern semantic tokens, so it themes automatically.
 *
 * @param {object}   props
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary']
 * @param {string}   [props.href]      When set, renders an anchor.
 * @param {boolean}  [props.external]  Opens the link in a new tab (adds rel safety).
 * @param {React.ReactNode} props.children
 */
function Button({ variant = 'primary', href, external = false, className = '', children, ...rest }) {
  const classes = `btn btn--${variant}${className ? ` ${className}` : ''}`;

  if (href) {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <a className={classes} href={href} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
