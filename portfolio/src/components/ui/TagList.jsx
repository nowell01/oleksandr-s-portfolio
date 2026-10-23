import styles from './TagList.module.css';

export default function TagList({ items, label, size = 'md' }) {
  return (
    <ul className={`${styles.list} ${styles[size]}`} aria-label={label}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  );
}
