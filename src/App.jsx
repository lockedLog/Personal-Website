import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Research from "./pages/Research";
import ArticlePage from "./pages/ArticlePage";
import ProjectFolder from "./pages/ProjectFolder";
import { articles, folders } from "./data/content";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [param, setParam] = useState(null);

  const navigate = (to, p = null) => {
    setPage(to);
    setParam(p);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (page === "home") {
      document.title = "Logan Kraus | Home";
    } else if (page === "research") {
      document.title = "Logan Kraus | Research";
    } else if (page === "article") {
      const found =
        articles.find((a) => a.id === param) ||
        folders.flatMap((f) => f.entries).find((e) => e.id === param);
      document.title = found?.title
        ? `Logan Kraus | ${found.title}`
        : "Logan Kraus | Article";
    } else if (page === "folder") {
      const folder = folders.find((f) => f.id === param);
      document.title = folder?.title
        ? `Logan Kraus | ${folder.title}`
        : "Logan Kraus | Research";
    } else {
      document.title = "Logan Kraus";
    }
  }, [page, param]);

  if (page === "home") return <Home navigate={navigate} />;
  if (page === "research") return <Research navigate={navigate} />;
  if (page === "article") return <ArticlePage id={param} navigate={navigate} />;
  if (page === "folder") return <ProjectFolder id={param} navigate={navigate} />;
  return <Home navigate={navigate} />;
}

export default App;
