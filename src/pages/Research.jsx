import Nav from "../components/Navigation.jsx";
import { articles } from "../data/content";

export default function Research({ navigate }) {
  return (
    <>
      <Nav navigate={navigate} />
      <main className="research-page">
        <header className="page-header">
          <h1 className="page-title">Blog</h1>
          <p className="page-subtitle">
            Research notes, technical write-ups, and things I find worth documenting.
          </p>
        </header>

        <section className="content-section">
          <h2 className="section-label">Articles</h2>
          <div className="articles-list">
            {articles.map((a) => (
              <article
                key={a.id}
                className="article-card"
                onClick={() => navigate("article", a.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("article", a.id)}
              >
                <time className="article-date">{a.date}</time>
                <h3 className="article-title">{a.title}</h3>
                <p className="article-desc">{a.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Logan Kraus</span>
      </footer>
    </>
  );
}
