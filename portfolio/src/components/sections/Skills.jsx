import { skillGroups } from '../../data/profile.js';
import SectionHeading from '../ui/SectionHeading.jsx';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" eyebrow="Skills" title="Tools I use in production">
        </SectionHeading>
        <div className={styles.grid}>
          {skillGroups.map(({ title, items }) => (
            <div key={title} className={styles.group}>
              <h3 className={styles.groupTitle}>{title}</h3>
              <ul className={styles.items}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
