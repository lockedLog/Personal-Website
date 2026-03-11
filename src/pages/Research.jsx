import Nav from "../components/Nav";
import { articles, folders } from "../data/content";

export default function Research({ navigate }) {
  return (
    <>
      <Nav navigate={navigate} />
      <main className="research-page">
        <div className="page-header">
          <p className="page-eyebrow">// research</p>
          <h1 className="page-title">Research</h1>
          <p className="page-subtitle">Personal projects and things I find interesting</p>
        </div>

        <div className="section-label">Articles</div>
        <div className="articles-list">
          {articles.map((a) => (
            <div
              key={a.id}
              className="article-card"
              onClick={() => navigate("article", a.id)}
            >
              <span className="article-date">{a.date}</span>
              <span className="article-title">{a.title}</span>
              <span className="article-desc">{a.description}</span>
              <span className="article-arrow">→</span>
            </div>
          ))}
        </div>

        <div className="section-label">Active Projects</div>
        <div className="folders-list">
          {folders.map((f) => (
            <div
              key={f.id}
              className="folder-card"
              onClick={() => navigate("folder", f.id)}
            >
              <span className="folder-icon">{f.icon}</span>
              <div className="folder-info">
                <div className="folder-title">{f.title}</div>
                <div className="folder-desc">{f.description}</div>
              </div>
              {f.status === "active" && (
                <span className="folder-badge active">In Progress</span>
              )}
              <span className="folder-arrow">→</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
