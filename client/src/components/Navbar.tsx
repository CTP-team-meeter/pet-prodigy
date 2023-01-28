import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full bg-black flex justify-around rounded-lg mb-10">
      <div className="nav__logo">
        <h1>AnimaDex</h1>
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
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          style={{ padding: '0 10px' }}
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/signup"
        >
          Signup
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
