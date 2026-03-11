import Nav from "../components/Navigation.jsx";
import { folders } from "../data/content";

export default function ProjectFolder({ id, navigate }) {
  const folder = folders.find((f) => f.id === id);

  if (!folder) {
    return (
      <>
        <Nav navigate={navigate} />
        <main className="folder-page">
          <button className="back-btn" onClick={() => navigate("research")}>← back</button>
          <p>Folder not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav navigate={navigate} />
      <main className="folder-page">
        <button className="back-btn" onClick={() => navigate("research")}>
          ← back to research
        </button>

        <div className="page-eyebrow">// active project</div>
        <h1 className="page-title">
          {folder.icon} {folder.title}
        </h1>
        <p className="page-subtitle">{folder.description}</p>

        <div className="folder-entries">
          {folder.entries.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontFamily: "Fira Code, monospace", marginTop: "1rem" }}>
              no entries yet
            </p>
          ) : (
            folder.entries.map((entry, i) => (
              <div key={i} className="entry-card">
                <div>
                  <div className="entry-title">
                    {entry.id ? (
                      <span
                        onClick={() => navigate("article", entry.id)}
                        style={{ color: "var(--accent)", cursor: "pointer", textDecoration: "none" }}
                      >
                        {entry.title} →
                      </span>
                    ) : entry.url ? (
                      <a href={entry.url} target="_blank" rel="noreferrer" style={{color: 'var(--accent)', textDecoration: 'none'}}>
                        {entry.title} ↗
                      </a>
                    ) : (
                      entry.title
                    )}
                  </div>
                  {entry.note && <div className="entry-note">{entry.note}</div>}
                </div>
                <div className="entry-date">{entry.date}</div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
}
