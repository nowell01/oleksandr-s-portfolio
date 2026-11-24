import styles from './EndpointTable.module.css';

/** API route table: method, path and a short description per row. */
export default function EndpointTable({ endpoints, caption }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">Route</th>
            <th scope="col">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map(({ method, path, description }) => (
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
  );
}
