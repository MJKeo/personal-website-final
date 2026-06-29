import './Hero.css';

/**
 * Generic hero band — an optional avatar, eyebrow, headline, supporting lead,
 * and an actions slot. Content-agnostic so it can front any screen.
 *
 * @param {object} props
 * @param {string} [props.avatar]    Optional circular image URL.
 * @param {string} [props.eyebrow]   Small kicker above the title.
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.subtitle]  Small kicker below the title.
 * @param {React.ReactNode} [props.lead]   Supporting paragraph (the pitch).
 * @param {React.ReactNode} [props.actions]  Buttons / links row.
 * @param {'left'|'center'} [props.align='center']
 */
function Hero({ avatar, eyebrow, title, subtitle, lead, actions, align = 'center' }) {
  return (
    <header className={`hero hero--${align}`}>
      {avatar && <img className="hero__avatar" src={avatar} alt="" aria-hidden="true" />}
      {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}
      <h1 className="hero__title">{title}</h1>
      {subtitle && <p className="hero__subtitle">{subtitle}</p>}
      {lead && <p className="hero__lead">{lead}</p>}
      {actions && <div className="hero__actions">{actions}</div>}
    </header>
  );
}

export default Hero;
