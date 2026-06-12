export default function Nav({ navigate, current }) {
  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => navigate("home")} aria-label="Home">
        <img src="/LK.png" alt="LK" className="nav-logo-img" />
      </button>
      <div className="nav-links">
        <button
          className={current === "home" ? "nav-active" : undefined}
          aria-current={current === "home" ? "page" : undefined}
          onClick={() => navigate("home")}
        >
          Home
        </button>
        <button
          className={current === "blog" ? "nav-active" : undefined}
          aria-current={current === "blog" ? "page" : undefined}
          onClick={() => navigate("research")}
        >
          Blog
        </button>
        <span className="nav-divider" />
        <a href="https://github.com/lockedLog" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/logankraus" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:lkk5397@psu.edu">Email</a>
      </div>
    </nav>
  );
}
