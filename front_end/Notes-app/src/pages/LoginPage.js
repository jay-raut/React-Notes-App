import { useState } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedInStatus] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login_user(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setSignedInStatus(true);
      });
    }

  }
  if (signedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login_user}>
      <h1 className="heading">Login</h1>
      <input type="text" placeholder="username" value={username} onChange={(ev) => setUserName(ev.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
      <button>Login</button>
    </form>
  );
}
