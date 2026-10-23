import { asset } from '../../utils/asset.js';
import styles from './Figure.module.css';

/**
 * Screenshot with a caption. Width and height are passed through so the
 * browser reserves space before the image loads (no layout shift).
 */
export default function Figure({ image, framed = true, eager = false, className = '' }) {
  const { src, width, height, alt, caption } = image;

  return (
    <figure className={`${styles.figure} ${className}`}>
      <div className={framed ? styles.frame : undefined}>
        <img
          src={asset(src)}
          width={width}
          height={height}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
