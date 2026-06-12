import Nav from "../components/Navigation.jsx";

export default function Home({ navigate }) {
  return (
    <>
      <Nav navigate={navigate} current="home" />
      <main className="home">
        <div className="home-orb" aria-hidden="true"></div>
        <section className="hero">
          <img
            src="/sig1.png"
            alt="Logan Kraus"
            className="hero-signature"
          />
        </section>

        <section className="home-intro">
          <p className="home-role">Cybersecurity · Penn State</p>
          <p className="home-bio">
            Driven by curiosity and a passion for solving complex problems.
          </p>
        </section>

        <section className="home-actions">
          <button className="btn-primary" onClick={() => navigate("research")}>
            View Blog
          </button>
          <div className="home-links">
            <a href="https://github.com/lockedLog" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/logankraus" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:lkk5397@psu.edu">
              Email
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Logan Kraus</span>
      </footer>
    </>
  );
}
