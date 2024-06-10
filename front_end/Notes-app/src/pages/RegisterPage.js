import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok){
        alert('User was created');
        window.location.href = "/";
    }else{
        alert('error while creation of user')
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1 className="heading">Register</h1>
      <input type="text" placeholder="username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
      <button>Register</button>
    </form>
  );
}
