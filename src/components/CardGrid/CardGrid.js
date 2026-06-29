import './CardGrid.css';

/**
 * Responsive card grid. Auto-fits its children into `min`-width columns (capped
 * by `columns`) and collapses to one column on narrow screens.
 *
 * @param {object} props
 * @param {number} [props.min=280]     Minimum column width in px.
 * @param {number} [props.columns]     Optional hard cap on column count.
 * @param {'sm'|'md'|'lg'} [props.gap='md']
 * @param {React.ReactNode} props.children
 */
function CardGrid({ min = 280, columns, gap = 'md', children }) {
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
