import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getApiUrl } from '../util/util';
import Button from '../components/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === 'Username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send data to server
    const response = await fetch(getApiUrl('login'), {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If response is ok, redirect to home page
    if (response.ok) {
      window.location.href = '/';
    }

    // If response is not ok, display error message
    const data = await response.json();
    setError(data.msg);

    // Clear input fields
    setUsername('');
    setPassword('');

    // Clear error message after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <div id="LoginPage" className="grid place-items-center">
      <div className="w-3/12 py-10 h-fit bg-secondary mx-auto rounded-lg shadow-inner">
        <img className="w-24 mx-auto mb-10" src="./logo.png" alt="login" />
        {error && (
          <p className="w-96 mx-auto text-red-500 font-bold text-lg text-center mb-5">
            {error}
          </p>
        )}
        <form action="/" method="POST" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-3">
            <img
              className="w-8 h-8 mr-3"
              src="./user_logo.png"
              alt="username"
            />
            <input
              onChange={handleChange}
              className="sm:w-3/5 w-32 h-9 p-4 sm:text-lg text-sm text-white rounded-md"
              type="text"
              placeholder="Username"
              value={username}
              required
            />
          </div>
          <div className="flex items-center justify-center mb-10">
            <img className="w-8 h-8 mr-3" src="./pwd_logo.png" alt="password" />
            <input
              onChange={handleChange}
              className="sm:w-3/5 w-32 h-9 p-4 sm:text-lg text-sm text-white rounded-md"
              type="password"
              placeholder="Password"
              value={password}
              required
            />
          </div>
          <br />
          <Button size="lg" title="Login" />
        </form>

        <p className="text-center mt-5">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <a
          className="absolute left-0 right-0 bottom-0"
          href="https://www.flaticon.com/free-icons/paw"
          title="paw icons"
        >
          Paw icons created by logisstudio - Flaticon
        </a>
      </div>
    </div>
  );
}

export default Login;
