import { useState } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import SnackBar from "../components/SnackBar";
export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedInStatus] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState("");
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
    } else {
      setSnackBarVisible(true);
      setSnackbarMessage("Credentials failed. Try again");
    }
  }
  if (signedIn) {
    return <Navigate to={"/notes"} />;
  }
  return (
    <div>
      <form className="login" onSubmit={login_user}>
        <h1 className="heading">Login</h1>
        <input type="text" placeholder="username" autoComplete="username" value={username} onChange={(ev) => setUserName(ev.target.value)} />
        <input type="password" placeholder="password" autoComplete="current-password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        <button>Login</button>
      </form>
      <SnackBar open={snackBarVisible} setOpen={setSnackBarVisible} message={snackBarMessage}></SnackBar>
    </div>
  );
}
