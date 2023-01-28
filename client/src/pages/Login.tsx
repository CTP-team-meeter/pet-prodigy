import React from 'react';

function Login() {
  return (
    <div>
      <h1 className="mb-5">Login</h1>
      <form action="POST">
        <input className="w-80 p-2 mb-3" type="text" placeholder="Username" />
        <br />
        <input
          className="w-80 p-2 mb-3"
          type="password"
          placeholder="Password"
        />
        <br />
        <button style={{ backgroundColor: '#1a1a1a' }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
