import './CardGrid.css';

/**
 * Responsive card grid. Auto-fits its children into `min`-width columns (capped
 * by `columns`) and collapses to one column on narrow screens.
 *
 * @param {object} props
 * @param {number} [props.min=300]     Minimum column width in px. The default
 *        fits 3 columns across the standard 1040px section at full width,
 *        degrading to 2 then 1 as the viewport narrows.
 * @param {number} [props.columns]     Optional hard cap on column count.
 * @param {'sm'|'md'|'lg'} [props.gap='md']
 * @param {React.ReactNode} props.children
 */
function CardGrid({ min = 300, columns, gap = 'md', children }) {
  const style = {
    '--card-grid-min': `${min}px`,
    ...(columns ? { '--card-grid-max-cols': columns } : {}),
  };
  return (
    <div className={`card-grid card-grid--gap-${gap}`} style={style} data-capped={columns ? 'true' : undefined}>
      {children}
    </div>
  );
}

export default CardGrid;
