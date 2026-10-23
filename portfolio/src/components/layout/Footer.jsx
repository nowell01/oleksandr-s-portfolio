import { profile } from '../../data/profile.js';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React and Vite · Deployed on Vercel</p>
      </div>
    </footer>
  );
}
