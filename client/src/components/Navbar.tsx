import React from 'react';
import Home from '../pages/Encyclopedia';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';
function Navbar({ themeToggle }: any) {
  return (
    <nav
      id="navbar"
      className="w-full sticky top-0 bg-slate-800 flex justify-around rounded-b-lg z-50"
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
          style={{ padding: '0 10px' }}
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={{ padding: '0 10px' }}
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/encyclopedia"
        >
          Encyclopedia
        </NavLink>
        <NavLink
          style={{ padding: '0 10px' }}
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/login"
        >
          Login
        </NavLink>

        {/* This toggle icon to be replaced with an image */}
        <div id="light-dark-toggle" onClick={themeToggle}>
          ☼
        </div>
        <NavLink
          style={{ padding: '0 10px' }}
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/signup"
        >
          <Button title={'Signup'} />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
