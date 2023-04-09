import './App.css';
import Home from './pages/Encyclopedia';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Map from './pages/Map';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import PetCommunity from './pages/PetCommunity';

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  );
  const themeToggle = () => {
    setTheme(theme == 'light' ? 'dark' : 'light');
  };
  return (
    <div className="App bg-primary text-primary" data-theme={theme}>
      <Router>
        <Navbar themeToggle={themeToggle} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/encyclopedia" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<Map />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pet-community" element={<PetCommunity />} />
          <Route path="*" element={<h1>Not Found (Error 404)</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
