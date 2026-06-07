import Nav from "../components/Navigation.jsx";
import { folders } from "../data/content";

export default function ProjectFolder({ id, navigate }) {
  const folder = folders.find((f) => f.id === id);

  if (!folder) {
    return (
      <>
        <Nav navigate={navigate} />
        <main className="folder-page">
          <button className="back-btn" onClick={() => navigate("research")}>← Back</button>
          <p className="not-found">Project not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav navigate={navigate} />
      <main className="folder-page">
        <button className="back-btn" onClick={() => navigate("research")}>
          ← Back to writing
        </button>

        <header className="page-header">
          <h1 className="page-title">{folder.title}</h1>
          <p className="page-subtitle">{folder.description}</p>
        </header>

        <div className="folder-entries">
          {folder.entries.length === 0 ? (
            <p className="empty-state">No entries yet.</p>
          ) : (
            folder.entries.map((entry, i) => (
              <div key={i} className="entry-card">
                <div>
                  <div className="entry-title">
                    {entry.id ? (
                      <button
                        className="entry-link"
                        onClick={() => navigate("article", entry.id)}
                      >
                        {entry.title}
                      </button>
                    ) : entry.url ? (
                      <a href={entry.url} target="_blank" rel="noreferrer" className="entry-link">
                        {entry.title} ↗
                      </a>
                    ) : (
                      entry.title
                    )}
                  </div>
                  {entry.note && <p className="entry-note">{entry.note}</p>}
                </div>
                <time className="entry-date">{entry.date}</time>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Logan Kraus</span>
      </footer>
    </>
  );
}
