import { useState } from "react";
import Button from "../components/Button";
function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(null);

  // Handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.placeholder === "Username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send data to server
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If response is ok, redirect to login page
    if (response.ok) {
      window.location.href = "/login";
    }

    // If response is not ok, display error message
    const data = await response.json();
    setError(data.msg);

    // Clear input fields
    setUsername("");
    setPassword("");

    // Clear error message after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  console.log(username, password);

  return (
    <div id="SignupPage" className="grid place-items-center">
      <div className="w-2/5 py-10 h-fit bg-secondary mx-auto rounded-lg">
        <h1 className="mx-auto sm:text-5xl text-2xl pb-8">Sign Up</h1>
        {error && (
          <p className="w-96 mx-auto text-red-500 text-lg text-center bg-secondary mb-5">
            {error}
          </p>
        )}
        <form action="/" method="POST" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="sm:w-3/5 w-32 h-9 p-4 mb-3 sm:text-lg text-sm text-black rounded-md"
            type="text"
            placeholder="Username"
            value={username}
            required
          />
          <br />
          <input
            onChange={handleChange}
            className="sm:w-3/5 w-32 h-9 p-4 mb-10 sm:text-lg text-sm text-black rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            required
          />
          <br />
          <Button size="lg" title="Sign Up" />
        </form>
      </div>
    </div>
  );
}

export default Signup;
