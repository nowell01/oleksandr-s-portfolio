import Figure from '../ui/Figure.jsx';
import StatGrid from '../ui/StatGrid.jsx';
import styles from './CaseStudy.module.css';

/**
 * Shared frame for a project case study: header with links and role,
 * cover screenshot, key figures, then project-specific content.
 */
export default function CaseStudy({ project, kicker, children }) {
  const { id, theme, title, subtitle, links, role, cover, stats } = project;
  const titleId = `${id}-title`;

  return (
    <section id={id} className={styles.section} data-accent={theme} aria-labelledby={titleId}>
      <div className={`container ${styles.stack}`}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <p className={styles.kicker}>{kicker}</p>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>

          <dl className={styles.facts}>
            {links.map(({ label, text, url }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  <a href={url} target="_blank" rel="noreferrer">
                    {text}
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt>Role</dt>
              <dd>{role}</dd>
            </div>
          </dl>
        </header>

        <Figure image={cover} />
        <StatGrid stats={stats} />

        {children}
      </div>
    </section>
  );
}
