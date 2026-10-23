import { cexDex } from '../../data/projects.js';
import Figure from '../ui/Figure.jsx';
import PointList from '../ui/PointList.jsx';
import SubHeading from '../ui/SubHeading.jsx';
import TagList from '../ui/TagList.jsx';
import ArchitectureDiagram from './ArchitectureDiagram.jsx';
import CaseStudy from './CaseStudy.jsx';
import shared from './CaseStudy.module.css';
import styles from './CexDexCaseStudy.module.css';

/** Wraps the first occurrence of `code` inside `text` in a <code> element. */
function withInlineCode(text, code) {
  if (!code || !text.includes(code)) return text;
  const [before, ...rest] = text.split(code);
  return (
    <>
      {before}
      <code>{code}</code>
      {rest.join(code)}
    </>
  );
}

export default function CexDexCaseStudy() {
  const project = cexDex;

  return (
    <CaseStudy project={project} kicker={`Project ${project.index} · Full-stack · Real-time`}>
      <div className={shared.twoCol}>
        <div className={shared.block}>
          <SubHeading>The problem</SubHeading>
          <div className={shared.prose}>
            {project.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={shared.block}>
          <SubHeading>What it does</SubHeading>
          <PointList items={project.features} />
        </div>
      </div>

      <div className={shared.block}>
        <SubHeading>Architecture</SubHeading>
        <ArchitectureDiagram architecture={project.architecture} />
      </div>

      <div className={shared.block}>
        <SubHeading>Engineering problems I solved</SubHeading>
        <div className={styles.challengesLayout}>
          <ul className={styles.challenges}>
            {project.challenges.map(({ title, text, code }) => (
              <li key={title} className={styles.challenge}>
                <h4 className={styles.challengeTitle}>{title}</h4>
                <p>{withInlineCode(text, code)}</p>
              </li>
            ))}
          </ul>
          <Figure image={project.alertsImage} className={styles.alerts} />
        </div>
      </div>

      <div className={shared.twoCol}>
        <div className={shared.block}>
          <SubHeading>REST &amp; real-time API</SubHeading>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="visually-hidden">Backend endpoints</caption>
              <thead>
                <tr>
                  <th scope="col">Method</th>
                  <th scope="col">Route</th>
                  <th scope="col">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {project.endpoints.map(({ method, path, description }) => (
                  <tr key={`${method} ${path}`}>
                    <td>
                      <span className={styles.method} data-method={method}>
                        {method}
                      </span>
                    </td>
                    <td>
                      <code>{path}</code>
                    </td>
                    <td>{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={shared.block}>
          <SubHeading>Tech stack</SubHeading>
          <TagList items={project.stack} label="CEX·DEX tech stack" />
        </div>
      </div>
    </CaseStudy>
  );
}
