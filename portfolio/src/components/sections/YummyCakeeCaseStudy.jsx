import { yummyCakee } from '../../data/projects.js';
import Figure from '../ui/Figure.jsx';
import PointList from '../ui/PointList.jsx';
import SubHeading from '../ui/SubHeading.jsx';
import TagList from '../ui/TagList.jsx';
import CaseStudy from './CaseStudy.jsx';
import shared from './CaseStudy.module.css';
import styles from './YummyCakeeCaseStudy.module.css';

export default function YummyCakeeCaseStudy() {
  const project = yummyCakee;
  const [signature, mobile] = project.gallery;

  return (
    <CaseStudy project={project} kicker={`Project ${project.index} · Client work · Front-end`}>
      <div className={shared.twoCol}>
        <div className={shared.block}>
          <SubHeading>The brief</SubHeading>
          <div className={shared.prose}>
            {project.brief.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className={styles.goal}>{project.goal}</p>
          </div>
        </div>
        <div className={shared.block}>
          <SubHeading>What I delivered</SubHeading>
          <PointList items={project.deliverables} />
        </div>
      </div>

      <div className={styles.gallery}>
        <Figure image={signature} />
        <Figure image={mobile} className={styles.mobile} />
      </div>

      <Figure image={project.stepsImage} />

      <div className={shared.twoCol}>
        <div className={shared.block}>
          <SubHeading>Technical details</SubHeading>
          <PointList items={project.technical} />
        </div>
        <div className={shared.block}>
          <SubHeading>What it shows</SubHeading>
          <div className={shared.prose}>
            {project.outcome.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.stack}>
            <TagList items={project.stack} label="Yummy Cakee tech stack" />
          </div>
        </div>
      </div>
    </CaseStudy>
  );
}
