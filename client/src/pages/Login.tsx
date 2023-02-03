import React from 'react';

function Login() {
  return (
    <div className="w-2/5 sm:h-96 h-fit bg-slate-500 mx-auto border-2 rounded-lg">
      <h1 className="mx-auto sm:text-5xl text-2xl p-8">Login</h1>
      <form action="/" method="POST">
        <input
          className="sm:w-3/5 w-32 h-9 p-1 mb-3 sm:text-lg text-sm"
          type="text"
          placeholder="Username"
          required
        />
        <br />
        <input
          className="sm:w-3/5 w-32 h-9 p-2 mb-10 sm:text-lg text-sm"
          type="password"
          placeholder="Password"
          required
        />
        <br />
        <button
          className="sm:w-3/5 w-20 sm:text-xl text-sm"
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
