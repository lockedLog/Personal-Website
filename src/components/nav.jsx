export default function Nav({ navigate }) {
  return (
    <nav className="nav">
      <span className="nav-logo" onClick={() => navigate("home")}>
        ~/logan
      </span>
      <div className="nav-links">
        <button onClick={() => navigate("home")}>Home</button>
        <button onClick={() => navigate("research")}>Research</button>
        <a href="https://github.com/lockedLog" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/logankraus" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </nav>
  );
}