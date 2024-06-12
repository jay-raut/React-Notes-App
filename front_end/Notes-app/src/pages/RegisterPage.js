import React, { useState } from "react";
import SnackBar from "../components/SnackBar";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setSnackBarVisible(true);
    } else {
      alert("Error while creating the user");
    }
  }
  const navigate = useNavigate();

  const LoginClick = () => {
    navigate("/login");
    setSnackBarVisible(false);
  };


  return (
    <div>
      <form className="register" onSubmit={register}>
        <h1 className="heading">Register</h1>
        <input type="text" placeholder="username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        <button>Register</button>
      </form>
      <SnackBar open={snackBarVisible} setOpen={setSnackBarVisible} message="Account created" onClick={LoginClick} onClickText="Login" />
    </div>
  );
}
