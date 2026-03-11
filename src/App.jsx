import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import Research from "./pages/Research.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import ProjectFolder from "./pages/ProjectFolder.jsx";
import { articles, folders } from "./data/content";
import "./App.css";

function App() {
  const parseUrl = () => {
    const path = window.location.pathname.replace(/\/$/, ""); 
    if (!path || path === "/") return { page: "home", param: null };
    if (path === "/research") return { page: "research", param: null };
    
    const parts = path.split('/').filter(Boolean);
    if (parts[0] === "research") {
      if (parts.length === 2) {
        const isFolder = folders.some(f => f.id === parts[1]);
        if (isFolder) return { page: "folder", param: parts[1] };
        return { page: "article", param: parts[1] };
      }
      if (parts.length === 3) {
        return { page: "article", param: parts[2] };
      }
    }
    return { page: "home", param: null };
  };

  const initialState = parseUrl();
  const [page, setPage] = useState(initialState.page);
  const [param, setParam] = useState(initialState.param);

  const navigate = (to, p = null) => {
    setPage(to);
    setParam(p);
    
    let url = "/";
    if (to === "research") {
      url = "/research";
    } else if (to === "folder") {
      url = `/research/${p}`;
    } else if (to === "article") {
      let parentFolder = folders.find(f => f.entries.some(e => e.id === p));
      if (parentFolder) {
        url = `/research/${parentFolder.id}/${p}`;
      } else {
        url = `/research/${p}`;
      }
    }
    window.history.pushState({ page: to, param: p }, "", url);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.history.replaceState({ page: initialState.page, param: initialState.param }, "", window.location.pathname);
    
    const handlePopState = (event) => {
      if (event.state) {
        setPage(event.state.page);
        setParam(event.state.param);
      } else {
        const state = parseUrl();
        setPage(state.page);
        setParam(state.param);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
