import { coreSkills, profile } from '../../data/profile.js';
import  master_cv  from '../../data/master_cv.pdf';
import styles from './Hero.module.css';

/* Simple line glyphs (24×24) */
const skillIcons = {
  csharp: (
    <>
      <path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z" />
      <text x="12" y="14.8" fontSize="7.5">
        C#
      </text>
    </>
  ),
  dotnet: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <text x="12" y="14.2" fontSize="6">
        .NET
      </text>
    </>
  ),
  api: (
    <>
      <path d="M9 4c-2 0-3 1-3 3v2.5c0 1.5-.8 2.5-2 2.5 1.2 0 2 1 2 2.5V17c0 2 1 3 3 3" />
      <path d="M15 4c2 0 3 1 3 3v2.5c0 1.5.8 2.5 2 2.5-1.2 0-2 1-2 2.5V17c0 2-1 3-3 3" />
      <path d="M10.5 12h3" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  python: (
    <>
      {/* two interlocking halves, simplified from the Python mark */}
      <path d="M11.5 2.5c-3.5 0-4.5 1.3-4.5 3.2V8h5v1H5.2C3.3 9 2 10.6 2 13s1.3 4 3.2 4H7v-2.6c0-1.6 1.2-2.9 2.8-2.9h4.5c1.4 0 2.7-1.2 2.7-2.7V5.7c0-1.9-1.6-3.2-5.5-3.2z" />
      <path
        d="M11.5 2.5c-3.5 0-4.5 1.3-4.5 3.2V8h5v1H5.2C3.3 9 2 10.6 2 13s1.3 4 3.2 4H7v-2.6c0-1.6 1.2-2.9 2.8-2.9h4.5c1.4 0 2.7-1.2 2.7-2.7V5.7c0-1.9-1.6-3.2-5.5-3.2z"
        transform="rotate(180 12 12)"
      />
      <circle cx="9.6" cy="5.2" r="0.9" fill="currentColor" />
      <circle cx="14.4" cy="18.8" r="0.9" fill="currentColor" />
    </>
  ),
  cloud: <path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 10.5a4 4 0 0 1 0 8z" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
    </>
  ),
  container: (
    <>
      <rect x="3" y="7" width="18" height="11" rx="1.5" />
      <path d="M7.5 10v5M12 10v5M16.5 10v5" />
    </>
  ),
};

function CoreSkills() {
  const { role, experience } = profile.cardSummary;

  return (
    <aside className={styles.skillCard} aria-label="Core skills">
      <div className={styles.skillHead}>
        <p className={styles.skillTitle}>Core stack</p>
        <a className={styles.skillMore} href="#skills">
          All skills →
        </a>
      </div>
      <ul className={styles.skillGrid}>
        {coreSkills.map(({ name, icon }) => (
          <li key={name} className={styles.skill}>
            <span className={styles.skillIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">{skillIcons[icon]}</svg>
            </span>
            <span className={styles.skillName}>{name}</span>
          </li>
        ))}
      </ul>
      <p className={styles.skillFoot}>
        <strong>{role}</strong> with <strong>{experience}</strong> of hands-on experience
      </p>
    </aside>
  );
}

export default function Hero() {
  const { name, role, stack, location, email, github, education } = profile;

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Project portfolio · 2026</p>
          <h1 id="hero-title" className={styles.title}>
            {name}
          </h1>
          <p className={styles.role}>
            {role} · {stack.join(' · ')}
          </p>
          <p className={styles.lede}>
            {education.program} student at{' '}
            <strong>{education.school}</strong>, graduating {education.graduation}. Below are three projects that are{' '}
            <strong>live in production</strong>: a real-time .NET + React system that watches crypto prices across
            seven exchanges, and websites I built for a bakery and a snow removal company.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#work">
              View projects
            </a>
            <a className={styles.secondary} href={master_cv} download="master_cv.pdf" target="_blank">
              Download CV
            </a>
          </div>

          <dl className={styles.meta}>
            <div>
              <dt>Location</dt>
              <dd>{location}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={github.url} target="_blank" rel="noreferrer">
                  {github.label}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <CoreSkills />
      </div>
    </section>
  );
}
