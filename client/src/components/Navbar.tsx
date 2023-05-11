import { NavLink } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';
import { useEffect, useState } from 'react';

function Navbar({ themeToggle }: any) {
  const [user, setUser] = useState({ username: '' });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoggedIn(false);
      return;
    }

    fetch('/api/login', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Not logged in');
        }

        return response.json();
      })
      .then((user) => {
        setUser(user);
        setLoggedIn(true);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        setLoggedIn(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser({ username: '' });
    setLoggedIn(false);
  };

  return (
    <nav
      id="navbar"
      className="w-full sticky top-0 bg-slate-800 flex justify-around rounded-b-lg z-50 mb-10"
    >
      <div className="nav__logo">
        <NavLink to="/">
          <h1 className="text-3xl p-2 text-primary hover:text-gray-300">
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

        {loggedIn && (
          <NavLink
            style={{
              margin: '0 15px',
              padding: '8px 10px',
              borderRadius: '5px',
            }}
            className={({ isActive }) => (isActive ? 'bg-primary' : '')}
            to="/pet-community"
          >
            Pet Community
          </NavLink>
        )}
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
        {!loggedIn && (
          <>
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
              to="/signup"
            >
              <Button title={'Sign Up'} />
            </NavLink>
          </>
        )}
      </div>
      {loggedIn && (
        <NavLink
          to="/"
          style={{
            margin: '0 15px',
            padding: '8px 10px',
            borderRadius: '5px',
          }}
        >
          <Button
            title={'Logout'}
            onclick={handleLogout}
            className="text-primary h-10"
          />
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
