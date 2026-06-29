import './Thumbnail.css';

/**
 * Media thumbnail with a graceful placeholder.
 *
 * Real imagery hasn't been supplied yet, so when `src` is omitted this renders
 * a themed placeholder tile (initials/label + a subtle pattern) at the right
 * aspect ratio. Drop in a `src` later and it becomes a real image with no other
 * changes needed.
 *
 * @param {object} props
 * @param {string} [props.src]    Image URL; omit for the placeholder.
 * @param {string} props.label    Shown in the placeholder; alt text for images.
 * @param {'16/9'|'4/3'|'1/1'} [props.ratio='16/9']
 */
function Thumbnail({ src, label = '', ratio = '16/9' }) {
  const initials = label
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="thumbnail" style={{ aspectRatio: ratio }}>
      {src ? (
        <img className="thumbnail__img" src={src} alt={label} loading="lazy" />
      ) : (
        <div className="thumbnail__placeholder" role="img" aria-label={`${label} (placeholder image)`}>
          <span className="thumbnail__initials" aria-hidden="true">{initials}</span>
          <span className="thumbnail__hint" aria-hidden="true">Placeholder</span>
        </div>
      )}
    </div>
  );
}

export default Thumbnail;
