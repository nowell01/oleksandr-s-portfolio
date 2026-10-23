import styles from './SubHeading.module.css';

export default function SubHeading({ children, as: Tag = 'h3', id }) {
  return (
    <Tag id={id} className={styles.heading}>
      {children}
    </Tag>
  );
}
