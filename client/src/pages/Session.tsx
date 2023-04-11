import { useEffect, useState } from "react";

function Session() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    useEffect(() => {}, []);

    return (
      <div>
        <h1>Session</h1>
      </div>
    );
  };
}
export default Session;
