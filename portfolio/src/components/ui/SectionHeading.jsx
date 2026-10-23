import styles from './SectionHeading.module.css';

export default function SectionHeading({ id, eyebrow, title, children }) {
  return (
    <header className={styles.heading}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children && <p className={styles.lede}>{children}</p>}
    </header>
  );
}
