import React from 'react';

function Signup() {
  return (
    <div>
      <h1 className="mb-5">Sign Up</h1>
      <form action="/" method="POST">
        <input
          className="w-80 p-2 mb-3"
          type="text"
          placeholder="Username"
          required
        />
        <br />
        <input
          className="w-80 p-2 mb-3"
          type="password"
          placeholder="Password"
          required
        />
        <br />
        <button style={{ backgroundColor: '#1a1a1a' }} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
