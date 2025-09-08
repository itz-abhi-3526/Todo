import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; 
function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    const info = JSON.parse(localStorage.getItem("users")) || [];
    const loguser = info.find((i) => i.user === user && i.password === password);
    if (loguser) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("current", loguser.user);
      nav("/dash");
    } else {
      alert("User not found. Please SignUp...");
      nav("/signup");
    }
  };

  return (
    <div className="auth-main">
      <div className="auth-container">
        <h1 className="auth-title">Login</h1>
        <form className="auth-form" onSubmit={login}>
          <input type="text" placeholder="Username" className="auth-field" value={user} onChange={(e) => setUser(e.target.value)} />
          <input type="password" placeholder="Password" className="auth-field" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="auth-btn">Login</button>
          <p className="auth-text">Don't have an account? <Link to="/signup">SignUp</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;