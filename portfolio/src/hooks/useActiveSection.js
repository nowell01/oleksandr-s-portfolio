import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in view, so the navigation
 * can highlight it. Uses IntersectionObserver instead of scroll events.
 *
 * @param {string[]} ids - element ids of the sections to watch, in page order
 * @returns {string | null} the id of the active section
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    const sections = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.target.offsetTop);
          else visible.delete(entry.target.id);
        });

        if (visible.size === 0) return;

        // The top-most visible section wins.
        const [topId] = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
        setActiveId(topId);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
