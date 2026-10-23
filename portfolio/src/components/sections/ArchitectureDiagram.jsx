import styles from './ArchitectureDiagram.module.css';

function Node({ name, detail, tone = 'default' }) {
  return (
    <div className={styles.node} data-tone={tone}>
      <span className={styles.nodeName}>{name}</span>
      {detail && <span className={styles.nodeDetail}>{detail}</span>}
    </div>
  );
}

function Connector({ label }) {
  return (
    <div className={styles.connector} aria-hidden="true">
      <span className={styles.arrow}>↓</span>
      {label && <span className={styles.connectorLabel}>{label}</span>}
    </div>
  );
}

/**
 * Data flow of the CEX·DEX system, drawn with HTML and CSS
 * so it stays crisp, themeable and readable by screen readers.
 */
export default function ArchitectureDiagram({ architecture }) {
  const { sources, fetchNote, pipeline, outputs, clients, hosting } = architecture;

  return (
    <figure className={styles.diagram}>
      <figcaption className="visually-hidden">
        Prices from seven exchanges flow into PriceMonitorService, then ArbitrageDetector, then AlertService, which
        feeds the SignalR hub, Telegram notifier, JSON storage and REST API. The React dashboard and Telegram bot
        consume them.
      </figcaption>

      <ul className={styles.sources}>
        {sources.map(({ name, note, dex }) => (
          <li key={name} className={styles.source} data-dex={dex || undefined}>
            {name}
            {note && <span className={styles.sourceNote}> ({note})</span>}
          </li>
        ))}
      </ul>

      <Connector label={fetchNote} />

      <ol className={styles.pipeline}>
        {pipeline.map((step) => (
          <li key={step.name}>
            <Node {...step} tone="primary" />
          </li>
        ))}
      </ol>

      <Connector />

      <ul className={styles.row}>
        {outputs.map((output) => (
          <li key={output.name}>
            <Node {...output} />
          </li>
        ))}
      </ul>

      <Connector />

      <ul className={`${styles.row} ${styles.clients}`}>
        {clients.map((client) => (
          <li key={client.name}>
            <Node {...client} tone="client" />
          </li>
        ))}
      </ul>

      <p className={styles.hosting}>{hosting}</p>
    </figure>
  );
}
