import { profile } from '../../data/profile.js';
import styles from './Hero.module.css';

function ProfileResponse() {
  const fields = [
    ['role', profile.currentRole.title],
    ['company', profile.currentRole.company],
    ['program', profile.education.program],
    ['school', profile.education.school],
    ['graduating', profile.education.graduation],
    ['location', profile.location],
  ];

  return (
    <div className={styles.response} aria-label="Profile summary">
      <div className={styles.responseBar}>
        <span className={styles.method}>GET</span>
        <code>/api/profile</code>
        <span className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          200 OK
        </span>
      </div>
      <pre className={styles.json}>
        <code>
          {'{\n'}
          {fields.map(([key, value], i) => (
            <span key={key}>
              {'  '}
              <span className={styles.jsonKey}>"{key}"</span>
              {': '}
              <span className={styles.jsonValue}>"{value}"</span>
              {i < fields.length - 1 ? ',\n' : '\n'}
            </span>
          ))}
          {'}'}
        </code>
      </pre>
    </div>
  );
}

export default function Hero() {
  const { name, role, stack, location, email, github, currentRole, education } = profile;

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
            {currentRole.title} at <strong>{currentRole.company}</strong> and {education.program} student at{' '}
            <strong>{education.school}</strong>, graduating {education.graduation}. Below are two projects that are{' '}
            <strong>live in production</strong>: a real-time .NET + React system that watches crypto prices across
            seven exchanges, and a website I built and delivered for a paying client’s bakery.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href="#work">
              View projects
            </a>
            <a className={styles.secondary} href={github.url} target="_blank" rel="noreferrer">
              GitHub profile
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

        <ProfileResponse />
      </div>
    </section>
  );
}
