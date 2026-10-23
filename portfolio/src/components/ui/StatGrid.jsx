import styles from './StatGrid.module.css';

export default function StatGrid({ stats }) {
  return (
    <dl className={styles.grid}>
      {stats.map(({ value, label }) => (
        <div key={label} className={styles.stat}>
          <dt className={styles.value}>{value}</dt>
          <dd className={styles.label}>{label}</dd>
        </div>
      ))}
    </dl>
  );
}
