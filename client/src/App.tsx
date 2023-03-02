import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useLocalStorage from "use-local-storage";
import { useEffect } from 'react';

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const themeToggle = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };
  useEffect(()=>{
    document.body.setAttribute("data-theme", theme);
  },[theme])
  return (
    <div className="App bg-primary text-primary">
      <Router>
        <Navbar themeToggle={themeToggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
