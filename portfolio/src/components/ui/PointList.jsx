import styles from './PointList.module.css';

/**
 * Bulleted list where each item opens with a bold lead word or phrase.
 * @param {{ items: { verb: string, text: string }[] }} props
 */
export default function PointList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map(({ verb, text }) => (
        <li key={verb} className={styles.item}>
          <strong>{verb}</strong> {text}
        </li>
      ))}
    </ul>
  );
}
