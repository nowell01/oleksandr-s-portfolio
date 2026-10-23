import { profile } from '../../data/profile.js';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard.js';
import styles from './Contact.module.css';

export default function Contact() {
  const { email, github, location } = profile;
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>Contact</p>
          <h2 id="contact-title" className={styles.title}>
            Looking for a junior .NET full-stack developer?
          </h2>
          <p className={styles.lede}>
            I’m based in {location} and open to full-time roles in the GTA. Email is the fastest way to reach me.
          </p>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Email</span>
          <div className={styles.emailRow}>
            <a className={styles.email} href={`mailto:${email}`}>
              {email}
            </a>
            <button type="button" className={styles.copy} onClick={() => copy(email)}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <span className="visually-hidden" role="status">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
          <a className={styles.github} href={github.url} target="_blank" rel="noreferrer">
            {github.label} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
