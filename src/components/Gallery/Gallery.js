import { useCallback, useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import CardCarousel from '../CardCarousel/CardCarousel';
import './Gallery.css';

/**
 * Gallery — a horizontal-scroll strip of images that reuses the homepage
 * <CardCarousel> style (snap + page dots). Runs the carousel in `autoSize` mode:
 * every tile is a uniform fixed height and its width follows the image's own
 * aspect ratio, so portrait and landscape shots can sit in the same strip without
 * the tall ones blowing out the height. Clicking a tile opens it full-screen in a lightbox overlay
 * (backdrop / close button / Esc close, prev-next when there's more than one,
 * body scroll locked while open). The opened image's `alt` doubles as a visible
 * caption beneath it in the lightbox. Generic and data-driven — pass any images.
 *
 * @param {object} props
 * @param {Array<{src: string, alt?: string}>} props.images
 * @param {string} [props.ariaLabel='Image gallery']  Label for the track + dialog.
 */
function Gallery({ images = [], ariaLabel = 'Image gallery' }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta) => setOpenIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  // Keyboard controls + body scroll lock, only while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, step]);

  if (images.length === 0) return null;

  return (
    <>
      <CardCarousel ariaLabel={ariaLabel} autoSize>
        {images.map((img, i) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            type="button"
            className="gallery__tile"
            onClick={() => setOpenIndex(i)}
            aria-label={`View ${img.alt || `image ${i + 1}`} full screen`}
          >
            <img className="gallery__img" src={img.src} alt={img.alt || ''} loading="lazy" />
          </button>
        ))}
      </CardCarousel>

      {isOpen && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          onClick={close}
        >
          <button type="button" className="gallery__close" onClick={close} aria-label="Close">
            &times;
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className="gallery__nav gallery__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
            >
              <HiChevronLeft aria-hidden="true" focusable="false" />
            </button>
          )}

          {/* No stopPropagation on the figure: its box is wider/taller than the
              image (it stretches to the caption and the gap between them), so
              swallowing clicks here would create a dead zone beside the image
              where the backdrop won't close. Instead only the image and caption
              themselves swallow the click; everything else bubbles up to close. */}
          <figure className="gallery__figure">
            <img
              className="gallery__lightbox-img"
              src={images[openIndex].src}
              alt={images[openIndex].alt || ''}
              onClick={(e) => e.stopPropagation()}
            />
            {images[openIndex].alt && (
              <figcaption className="gallery__caption" onClick={(e) => e.stopPropagation()}>
                {images[openIndex].alt}
              </figcaption>
            )}
          </figure>

          {images.length > 1 && (
            <button
              type="button"
              className="gallery__nav gallery__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
            >
              <HiChevronRight aria-hidden="true" focusable="false" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Gallery;
