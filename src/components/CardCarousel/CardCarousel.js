import { Children, useCallback, useEffect, useRef, useState } from 'react';
import './CardCarousel.css';

/**
 * Horizontal-scroll carousel with snap + dot navigation. Generic — pass any
 * cards as children.
 *
 * Snapping follows one rule: the scroll rests with the **leftmost visible slide
 * flush to the left edge**, except at the very end of the scroll (where the last
 * slide sits flush right). Each dot is one such stop, derived from the slides'
 * real positions rather than a fixed group size, so it works for uniform cards
 * and for mixed-width content (e.g. the `autoSize` image gallery) alike.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children   Cards to scroll through.
 * @param {string} [props.ariaLabel='Carousel']  Accessible label for the track.
 * @param {string} [props.slideSize]  Overrides the per-slide flex-basis (any CSS
 *        length/clamp), e.g. to fit ~2 wide slides per view. Defaults to the
 *        card width `clamp(250px, 80%, 320px)`. Ignored when `autoSize` is set.
 * @param {boolean} [props.autoSize=false]  Size each slide to its content's width
 *        instead of a fixed flex-basis — e.g. fixed-height images whose width
 *        follows their aspect ratio, so a strip of mixed portrait/landscape shots
 *        all share one height. The child owns its own width.
 */
function CardCarousel({ children, ariaLabel = 'Carousel', slideSize, autoSize = false }) {
  const trackRef = useRef(null);
  // Snap stops (scrollLeft values), mirrored in a ref so the scroll handler can
  // read the latest without re-subscribing.
  const stopsRef = useRef([0]);
  const [stops, setStops] = useState([0]);
  const [active, setActive] = useState(0);

  const slides = Children.toArray(children);
  const count = slides.length;

  // Each stop is the scrollLeft that puts a slide flush against the left edge,
  // capped at the end of the scroll. Positions are non-decreasing, so trailing
  // slides that can't reach flush-left collapse into the single end stop — the
  // last dot is therefore always "the end of the scroll".
  const computeStops = useCallback(() => {
    const el = trackRef.current;
    if (!el) return [0];
    const items = el.children;
    if (items.length === 0) return [0];
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const base = items[0].offsetLeft; // cancels the track's left padding
    const next = [];
    for (let i = 0; i < items.length; i += 1) {
      const pos = Math.min(items[i].offsetLeft - base, maxScroll);
      if (next.length === 0 || pos - next[next.length - 1] > 1) next.push(pos);
    }
    // Always include the true end so the last (possibly partial) slide is reachable.
    if (next[next.length - 1] < maxScroll - 1) next.push(maxScroll);
    return next;
  }, []);

  // Active dot = the stop nearest the current scroll position. Nearest (rather
  // than "largest stop at or before scrollLeft") keeps the final stop lit at the
  // end of the scroll, where snap-align:end rests a few px short of it because of
  // the track's right padding. Ties favor the later stop.
  const syncActive = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const list = stopsRef.current;
    const sl = el.scrollLeft;
    let idx = 0;
    let best = Infinity;
    for (let i = 0; i < list.length; i += 1) {
      const dist = Math.abs(list[i] - sl);
      if (dist <= best) {
        best = dist;
        idx = i;
      }
    }
    setActive(idx);
  }, []);

  const recompute = useCallback(() => {
    const next = computeStops();
    stopsRef.current = next;
    setStops(next);
    syncActive();
  }, [computeStops, syncActive]);

  useEffect(() => {
    recompute();
    const el = trackRef.current;
    if (!el) return undefined;
    el.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', recompute);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(recompute) : null;
    if (ro) {
      ro.observe(el);
      // Observe each slide too, so a tile whose size settles after mount (e.g. a
      // lazy-loaded image filling its fixed-height tile) re-triggers the stops.
      for (let i = 0; i < el.children.length; i += 1) ro.observe(el.children[i]);
    }
    return () => {
      el.removeEventListener('scroll', syncActive);
      window.removeEventListener('resize', recompute);
      if (ro) ro.disconnect();
    };
  }, [recompute, syncActive, slideSize, autoSize, count]);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const list = stopsRef.current;
    const clamped = Math.max(0, Math.min(list.length - 1, i));
    el.scrollTo({ left: list[clamped] ?? 0, behavior: 'smooth' });
  };

  const trackStyle = slideSize ? { '--carousel-slide-size': slideSize } : undefined;

  return (
    <div className="carousel">
      <div className="carousel__viewport">
        <ul
          className={`carousel__track${autoSize ? ' carousel__track--auto' : ''}`}
          ref={trackRef}
          aria-label={ariaLabel}
          style={trackStyle}
        >
          {slides.map((child, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="carousel__slide" key={i}>
              {child}
            </li>
          ))}
        </ul>
      </div>

      {stops.length > 1 && (
        <div className="carousel__dots">
          {stops.map((_, i) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={`carousel__dot${i === active ? ' carousel__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to position ${i + 1}`}
              aria-current={i === active}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardCarousel;
