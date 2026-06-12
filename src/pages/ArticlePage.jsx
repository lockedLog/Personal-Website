import { useMemo } from "react";
import Nav from "../components/Navigation.jsx";
import { articles, folders } from "../data/content";

export default function ArticlePage({ id, navigate }) {
  const allArticles = useMemo(() => {
    const folderEntries = folders.flatMap((f) =>
      f.entries.filter((e) => e.id).map((e) => ({ ...e, folderId: f.id }))
    );
    return [...articles, ...folderEntries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, []);

  const article = allArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <>
        <Nav navigate={navigate} current="blog" />
        <main className="article-page">
          <button className="back-btn" onClick={() => navigate("research")}>
            ← Back
          </button>
          <p className="not-found">Article not found.</p>
        </main>
      </>
    );
  }

  const currentIndex = allArticles.findIndex((a) => a.id === id);
  let recommendations = [];

  const prev = currentIndex + 1 < allArticles.length ? allArticles[currentIndex + 1] : null;
  const next = currentIndex - 1 >= 0 ? allArticles[currentIndex - 1] : null;

  if (prev && next) {
    recommendations = [prev, next];
  } else if (!prev && next) {
    recommendations = allArticles
      .filter((_, i) => i < currentIndex)
      .slice(-2);
  } else if (prev && !next) {
    recommendations = allArticles
      .filter((_, i) => i > currentIndex)
      .slice(0, 2);
  }

  const handleRecClick = (rec) => {
    navigate("article", rec.id);
  };

  return (
    <>
      <Nav navigate={navigate} />
      <main className="article-page">
        <button className="back-btn" onClick={() => navigate("research")}>
          ← Back to blog
        </button>

        <header className="article-header">
          <time className="article-meta">{article.date}</time>
          <h1 className="article-full-title">{article.title}</h1>
          <p className="article-full-desc">{article.description}</p>
        </header>

        <article
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {recommendations.length > 0 && (
          <nav className="read-next">
            <span className="read-next-label">Read Next</span>
            <div className="read-next-grid">
              {recommendations.map((rec) => (
                <button
                  key={rec.id}
                  className="read-next-card"
                  onClick={() => handleRecClick(rec)}
                >
                  <time className="read-next-date">{rec.date}</time>
                  <span className="read-next-title">{rec.title}</span>
                </button>
              ))}
            </div>
          </nav>
        )}
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Logan Kraus</span>
      </footer>
    </>
  );
}
