import './Tag.css';

/**
 * Small pill label — used for tech stack chips, categories, and status flags.
 *
 * @param {object} props
 * @param {'neutral'|'primary'|'accent'} [props.tone='neutral']
 * @param {React.ReactNode} props.children
 */
function Tag({ tone = 'neutral', children }) {
  return <span className={`tag tag--${tone}`}>{children}</span>;
}

/**
 * Convenience row of tags from an array of strings.
 * @param {{items: string[], tone?: string}} props
 */
export function TagList({ items = [], tone = 'neutral' }) {
  if (!items.length) return null;
  return (
    <ul className="tag-list" aria-label="Tags">
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

export default Tag;
