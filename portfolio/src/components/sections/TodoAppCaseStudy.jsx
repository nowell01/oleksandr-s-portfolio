import { todoApp } from '../../data/projects.js';
import EndpointTable from '../ui/EndpointTable.jsx';
import PointList from '../ui/PointList.jsx';
import SubHeading from '../ui/SubHeading.jsx';
import TagList from '../ui/TagList.jsx';
import CaseStudy from './CaseStudy.jsx';
import shared from './CaseStudy.module.css';
import styles from './ClientCaseStudy.module.css';

export default function TodoAppCaseStudy() {
  const project = todoApp;

  return (
    <CaseStudy project={project} kicker={`Project ${project.index} · Full-stack · Python`}>
      <div className={shared.twoCol}>
        <div className={shared.block}>
          <SubHeading>Why I built it</SubHeading>
          <div className={shared.prose}>
            {project.brief.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className={styles.goal}>{project.goal}</p>
          </div>
        </div>
        <div className={shared.block}>
          <SubHeading>What it does</SubHeading>
          <PointList items={project.features} />
        </div>
      </div>

      <div className={shared.twoCol}>
        <div className={shared.block}>
          <SubHeading>How it works</SubHeading>
          <PointList items={project.technical} />
        </div>
        <div className={shared.block}>
          <SubHeading>Testing &amp; DevOps</SubHeading>
          <PointList items={project.testing} />
        </div>
      </div>

      <div className={shared.twoCol}>
        <div className={shared.block}>
          <SubHeading>REST API</SubHeading>
          <EndpointTable endpoints={project.endpoints} caption="Todo app API endpoints" />
        </div>
        <div className={shared.block}>
          <SubHeading>What it shows</SubHeading>
          <div className={shared.prose}>
            {project.outcome.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.stack}>
            <TagList items={project.stack} label="Todo app tech stack" />
          </div>
        </div>
      </div>
    </CaseStudy>
  );
}
