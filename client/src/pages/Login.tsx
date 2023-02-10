import { useState } from 'react';

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
    const response = await fetch('/api/login', {
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
    <div className="w-2/5 sm:h-96 h-fit bg-slate-500 mx-auto border-2 rounded-lg">
      <h1 className="mx-auto sm:text-5xl text-2xl p-8">Login Up</h1>
      {error && (
        <p className="w-96 mx-auto text-red-500 font-bold text-lg text-center bg-white mb-5">
          {error}
        </p>
      )}
      <form action="/" method="POST" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="sm:w-3/5 w-32 h-9 p-1 mb-3 sm:text-lg text-sm"
          type="text"
          placeholder="Username"
          value={username}
          required
        />
        <br />
        <input
          onChange={handleChange}
          className="sm:w-3/5 w-32 h-9 p-2 mb-10 sm:text-lg text-sm"
          type="password"
          placeholder="Password"
          value={password}
          required
        />
        <br />
        <button
          className="sm:w-3/5 w-32 sm:text-xl text-sm"
          style={{ backgroundColor: '#1a1a1a' }}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
