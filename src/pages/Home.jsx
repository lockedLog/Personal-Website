import { useEffect, useRef, useState } from "react";
import Nav from "../components/Navigation.jsx";

function TechBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const chars = "01ABCDEF0123456789";
    const fontSize = 18;
    let cols, drops;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    }

    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    function draw(ts) {
      animId = requestAnimationFrame(draw);
      if (ts - last < 130) return;
      last = ts;

      ctx.fillStyle = "rgba(8,12,16,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (Math.random() > 0.5) continue;
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.95 ? 0.75 : 0.15;
        ctx.fillStyle = `rgba(68,170,255,${alpha})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.5,
        pointerEvents: "none",
      }}
    />
  );
}

const LINES = [
  { id: 0, prompt: "logan@kali:~$", cmd: "whoami", delay: 500 },
  { id: 1, output: "logan", delay: 1200 },
  { id: 2, prompt: "logan@kali:~$", cmd: "cat interests.txt", delay: 1000 },
  { id: 3, output: "blue team research · automation · networking", delay: 1900 },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [typed, setTyped] = useState({});

  useEffect(() => {
    LINES.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines((v) => [...v, line.id]);
        if (line.cmd) {
          let j = 0;
          const iv = setInterval(() => {
            j++;
            setTyped((prev) => ({ ...prev, [line.id]: line.cmd.slice(0, j) }));
            if (j >= line.cmd.length) clearInterval(iv);
          }, 55);
        }
      }, line.delay);
      return () => clearTimeout(t);
    });
  }, []);

  const lastCmdLine = [...LINES].reverse().find((l) => l.cmd && visibleLines.includes(l.id));
  const lastCmdDone = lastCmdLine && typed[lastCmdLine.id]?.length === lastCmdLine.cmd?.length;

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-ps-title">● logan@kali: ~</span>
      </div>
      <div className="terminal-body">
        {LINES.map((line) =>
          visibleLines.includes(line.id) ? (
            <div key={line.id} className={line.prompt ? "terminal-line" : "terminal-output-line"}>
              {line.prompt ? (
                <>
                  <span className="terminal-prompt-ps">logan@kali:~$</span>
                  <span className="terminal-cmd">&nbsp;{typed[line.id] || ""}</span>
                </>
              ) : (
                <span className="terminal-out-text">{line.output}</span>
              )}
            </div>
          ) : null
        )}
        {lastCmdDone && (
          <div className="terminal-line">
            <span className="terminal-prompt-ps">logan@kali:~$</span>
            <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home({ navigate }) {
  return (
    <>
      <TechBackground />
      <Nav navigate={navigate} />
      <main className="home">
        <p className="home-eyebrow"></p>

        <h1 className="home-name">
          Logan<br />Kraus
        </h1>

        <p className="home-role">Cybersecurity Major at Penn State</p>

        <Terminal />

        <div className="home-primary-cta">
          <a
            className="home-link primary"
            onClick={() => navigate("research")}
            style={{ cursor: "pointer" }}
          >
            Research &amp; Projects
          </a>
        </div>

        <div className="home-links">
          <a
            className="home-link"
            href="https://github.com/lockedLog"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="home-link"
            href="https://linkedin.com/in/logankraus"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a className="home-link" href="mailto:logan@logank.net">
            Email
          </a>
        </div>
      </main>
    </>
  );
}
