import { useEffect, useState } from 'react';
import { navLinks, profile } from '../../data/profile.js';
import styles from './Header.module.css';

export default function Header({ activeId }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu with Escape, or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => event.key === 'Escape' && setMenuOpen(false);
    const desktop = window.matchMedia('(min-width: 769px)');
    const onResize = (event) => event.matches && setMenuOpen(false);

    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand} onClick={closeMenu}>
          <span className={styles.monogram} aria-hidden="true">
            ON
          </span>
          <span>{profile.name}</span>
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className={styles.menuIcon} data-open={menuOpen} aria-hidden="true" />
        </button>

        <nav id="site-nav" className={styles.nav} data-open={menuOpen} aria-label="Main">
          <ul className={styles.links}>
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.link}
                  aria-current={activeId === id ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a className={styles.cta} href={profile.github.url} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
