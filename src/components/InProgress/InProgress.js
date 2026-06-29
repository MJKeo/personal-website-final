import './InProgress.css';

/**
 * Minimal placeholder for any page that isn't built yet. Shows a friendly
 * "robot at work" cartoon (inline SVG, themed via Fern tokens + gently
 * animated) above a single in-progress line. Self-contained spacing/centering,
 * so a screen can render it as its sole content.
 */
function InProgress() {
  return (
    <div className="in-progress">
      <svg
        className="in-progress__art"
        viewBox="0 0 220 210"
        role="img"
        aria-label="A friendly cartoon robot hard at work"
      >
        {/* ground shadow */}
        <ellipse cx="110" cy="194" rx="58" ry="8" fill="var(--color-placeholder-dot)" opacity="0.55" />

        {/* background gears */}
        <g className="in-progress__gear in-progress__gear--a" transform="translate(38 64)">
          <rect x="-17" y="-17" width="34" height="34" rx="9" fill="var(--color-border)" />
          <rect x="-17" y="-17" width="34" height="34" rx="9" fill="var(--color-border)" transform="rotate(45)" />
          <circle r="9" fill="var(--color-bg)" />
        </g>
        <g className="in-progress__gear in-progress__gear--b" transform="translate(184 150)">
          <rect x="-13" y="-13" width="26" height="26" rx="7" fill="var(--color-border)" />
          <rect x="-13" y="-13" width="26" height="26" rx="7" fill="var(--color-border)" transform="rotate(45)" />
          <circle r="7" fill="var(--color-bg)" />
        </g>

        {/* the robot */}
        <g className="in-progress__bot">
          {/* antenna + blinking light */}
          <line x1="110" y1="42" x2="110" y2="26" stroke="var(--color-text-muted)" strokeWidth="4" strokeLinecap="round" />
          <circle className="in-progress__blink" cx="110" cy="20" r="6" fill="var(--color-secondary)" />

          {/* head */}
          <rect x="70" y="58" width="8" height="22" rx="4" fill="var(--color-primary-hover)" />
          <rect x="142" y="58" width="8" height="22" rx="4" fill="var(--color-primary-hover)" />
          <rect x="76" y="42" width="68" height="54" rx="16" fill="var(--color-primary)" />

          {/* face */}
          <rect x="86" y="52" width="48" height="34" rx="10" fill="var(--color-surface)" />
          <circle cx="102" cy="66" r="5" fill="var(--color-primary)" />
          <circle cx="118" cy="66" r="5" fill="var(--color-primary)" />
          <path d="M101 76 Q110 84 119 76" stroke="var(--color-primary)" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* neck + body */}
          <rect x="101" y="94" width="18" height="10" fill="var(--color-primary-hover)" />
          <rect x="70" y="100" width="80" height="58" rx="18" fill="var(--color-primary)" />

          {/* belly panel with a turning gear */}
          <rect x="86" y="112" width="48" height="30" rx="9" fill="var(--color-primary-subtle)" />
          <g className="in-progress__gear in-progress__gear--c" transform="translate(110 127)">
            <rect x="-11" y="-11" width="22" height="22" rx="6" fill="var(--color-primary)" />
            <rect x="-11" y="-11" width="22" height="22" rx="6" fill="var(--color-primary)" transform="rotate(45)" />
            <circle r="5" fill="var(--color-primary-subtle)" />
          </g>

          {/* status lights */}
          <circle cx="98" cy="150" r="3" fill="var(--color-secondary)" />
          <circle cx="110" cy="150" r="3" fill="var(--color-on-primary)" />
          <circle cx="122" cy="150" r="3" fill="var(--color-secondary)" />

          {/* left arm */}
          <rect x="52" y="106" width="16" height="40" rx="8" fill="var(--color-primary-hover)" />
          <circle cx="60" cy="148" r="9" fill="var(--color-primary)" />

          {/* right arm — waving */}
          <g className="in-progress__wave">
            <rect x="150" y="104" width="38" height="15" rx="7" fill="var(--color-primary-hover)" transform="rotate(-28 152 112)" />
            <circle cx="184" cy="86" r="9" fill="var(--color-primary)" />
          </g>

          {/* legs */}
          <rect x="88" y="156" width="16" height="22" rx="7" fill="var(--color-primary-hover)" />
          <rect x="116" y="156" width="16" height="22" rx="7" fill="var(--color-primary-hover)" />
        </g>
      </svg>

      <p className="in-progress__text">This page is in progress, please check back later</p>
    </div>
  );
}

export default InProgress;
