import { projects } from '../../data/projects.js';
import { asset } from '../../utils/asset.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import TagList from '../ui/TagList.jsx';
import styles from './ProjectsOverview.module.css';

function ProjectCard({ project }) {
  const { id, index, category, badge, theme, title, summary, cover, overviewTags } = project;

  return (
    <article className={styles.card} data-accent={theme}>
      <a href={`#${id}`} className={styles.media} tabIndex={-1} aria-hidden="true">
        <img src={asset(cover.src)} width={cover.width} height={cover.height} alt="" loading="lazy" decoding="async" />
      </a>
      <div className={styles.body}>
        <p className={styles.kicker}>
          <span>
            {index} · {category}
          </span>
          <span className={styles.badge}>{badge}</span>
        </p>
        <h3 className={styles.title}>
          <a href={`#${id}`}>{title}</a>
        </h3>
        <p className={styles.summary}>{summary}</p>
        <TagList items={overviewTags} label={`${title} technologies`} size="sm" />
        <a href={`#${id}`} className={styles.more}>
          Read the case study <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export default function ProjectsOverview() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <SectionHeading id="work-title" eyebrow="Selected work" title="Two projects running in production">
          One full-stack system I designed and run on my own, and one website delivered to a paying client.
        </SectionHeading>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
