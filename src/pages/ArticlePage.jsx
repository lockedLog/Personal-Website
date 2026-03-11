import Nav from "../components/Navigation.jsx";
import { articles, folders } from "../data/content";

export default function ArticlePage({ id, navigate }) {
  const article = articles.find((a) => a.id === id) || folders.flatMap((f) => f.entries).find((e) => e.id === id);

  if (!article) {
    return (
      <>
        <Nav navigate={navigate} />
        <main className="article-page">
          <button className="back-btn" onClick={() => navigate("research")}>
            ← back
          </button>
          <p>Article not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav navigate={navigate} />
      <main className="article-page">
        <button className="back-btn" onClick={() => navigate("research")}>
          ← back to research
        </button>

        <div className="article-meta">{article.date}</div>
        <h1 className="article-full-title">{article.title}</h1>

        <div className="article-full-desc">{article.description}</div>

        <div className="article-placeholder">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </main>
    </>
  );
}
