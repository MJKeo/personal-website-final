import { useEffect, useRef, useState } from 'react';
import './ParticleControls.css';

/**
 * ParticleControls — a compact picker that rests as a single circle and expands
 * vertically downward to reveal every option, collapsing back once the pointer
 * leaves (or focus moves away / Escape). Generic and data-driven; pairs
 * naturally with <ParticleField> but knows nothing about it.
 *
 * Open/close is driven entirely from JS state (not CSS :hover/:focus-within) so
 * it can't get pinned open — e.g. by a button that stays focused after a
 * click-drag that never fires a `click`.
 *
 * @param {object} props
 * @param {string} props.value                       Currently selected value.
 * @param {(value: string) => void} props.onChange   Called with the picked value.
 * @param {Array<{value: string, label: string, icon?: React.ReactNode}>} props.options
 * @param {React.ReactNode} [props.triggerIcon]      Fixed icon for the resting
 *        circle; defaults to the selected option's icon when omitted.
 * @param {string} [props.ariaLabel='Background effect']
 * @param {string} [props.className='']
 */
function ParticleControls({ value, onChange, options, triggerIcon, ariaLabel = 'Background effect', className = '' }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value) || options[0];
  const headIcon = triggerIcon !== undefined ? triggerIcon : selected.icon;

  // While open, watch the whole document and collapse the moment the pointer is
  // no longer over the menu — robust against click-drag off a button (which
  // never fires `click`) and missed `mouseleave`. Also close on outside
  // press / Escape.
  useEffect(() => {
    if (!open) return undefined;
    const within = (node) => !!menuRef.current && menuRef.current.contains(node);
    const close = () => {
      if (within(document.activeElement)) document.activeElement.blur();
      setOpen(false);
    };
    const onPointerMove = (e) => { if (!within(e.target)) close(); };
    const onPointerDown = (e) => { if (!within(e.target)) close(); };
    const onKeyDown = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      className={`particle-menu${open ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
    >
      <button
        type="button"
        className="particle-menu__trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${ariaLabel}: ${selected.label}`}
        onClick={() => setOpen(true)}
      >
        <span className="particle-menu__icon" aria-hidden="true">{headIcon}</span>
      </button>

      <div className="particle-menu__list" role="radiogroup" aria-label={ariaLabel}>
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={opt.label}
              title={opt.label}
              className={`particle-menu__option${active ? ' is-active' : ''}`}
              onClick={() => onChange(opt.value)}
            >
              <span className="particle-menu__icon" aria-hidden="true">{opt.icon}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ParticleControls;
