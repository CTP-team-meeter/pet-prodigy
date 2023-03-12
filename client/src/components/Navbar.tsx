import { NavLink } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';
function Navbar({ themeToggle }: any) {
  return (
    <nav
      id="navbar"
      className="w-full sticky top-0 bg-slate-800 flex justify-around rounded-b-lg z-50 mb-10"
    >
      <div className="nav__logo">
        <NavLink to="/">
          <h1 className="text-3xl p-2 text-white hover:text-gray-300">
            Pet Prodigy
          </h1>
        </NavLink>
      </div>

      <div className="nav__links flex items-center">
        <NavLink
          style={{
            margin: '0 15px',
            padding: '8px 10px',
            borderRadius: '5px',
          }}
          className={({ isActive }) => (isActive ? 'bg-primary' : '')}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={{
            margin: '0 15px',
            padding: '8px 10px',
            borderRadius: '5px',
          }}
          className={({ isActive }) => (isActive ? 'bg-primary' : '')}
          to="/encyclopedia"
        >
          Encyclopedia
        </NavLink>
        <NavLink
          style={{
            margin: '0 15px',
            padding: '8px 10px',
            borderRadius: '5px',
          }}
          className={({ isActive }) => (isActive ? 'bg-primary' : '')}
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          style={{
            margin: '0 15px',
            padding: '8px 10px',
            borderRadius: '5px',
          }}
          className={({ isActive }) => (isActive ? 'bg-primary' : '')}
          to="/map"
        >
          Find Pet Stores
        </NavLink>

        {/* This toggle icon to be replaced with an image */}
        <div id="light-dark-toggle" onClick={themeToggle}>
          ☼
        </div>
        <NavLink
          style={{
            margin: '0 15px',
            padding: '8px 10px',
            borderRadius: '5px',
          }}
          to="/signup"
        >
          <Button title={'Signup'} />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
