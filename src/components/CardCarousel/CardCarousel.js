import { Children, useCallback, useEffect, useRef, useState } from 'react';
import './CardCarousel.css';

/**
 * Paginated horizontal-scroll carousel. Lays its children out in a snapping
 * horizontal track navigated by swipe/scroll and page dots. Generic — pass any
 * cards as children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children   Cards to page through.
 * @param {string} [props.ariaLabel='Carousel']  Accessible label for the track.
 */
function CardCarousel({ children, ariaLabel = 'Carousel' }) {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    const pages = Math.max(1, Math.round(scrollWidth / clientWidth));
    setPageCount(pages);
    setPage(Math.min(pages - 1, Math.round(scrollLeft / clientWidth)));
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return undefined;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const goTo = (target) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(pageCount - 1, target));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
  };

  const slides = Children.toArray(children);

  return (
    <div className="carousel">
      <div className="carousel__viewport">
        <ul className="carousel__track" ref={trackRef} aria-label={ariaLabel}>
          {slides.map((child, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="carousel__slide" key={i}>
              {child}
            </li>
          ))}
        </ul>
      </div>

      {pageCount > 1 && (
        <div className="carousel__dots">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={`carousel__dot${i === page ? ' carousel__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardCarousel;
