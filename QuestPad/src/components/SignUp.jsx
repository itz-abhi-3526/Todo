import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; // single CSS for all
function SignUp() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const signup = (e) => {
    e.preventDefault();
    const usersinfo = JSON.parse(localStorage.getItem("users")) || [];
    if (usersinfo.some((i) => i.user === user)) {
      alert("User already exists. Please Login.");
      nav("/");
    } else {
      if (user === "" || password === "") {
        alert("Please fill up all the credentials.");
      } else {
        const newinfo = [...usersinfo, { user, password }];
        localStorage.setItem("users", JSON.stringify(newinfo));
        localStorage.setItem("auth", "true");
        localStorage.setItem("current", user);
        alert("SignUp Completed!!");
        nav("/dash");
      }
    }
  };

  return (
    <div className="auth-main">
      <div className="auth-container">
        <h1 className="auth-title">SignUp</h1>
        <form className="auth-form" onSubmit={signup}>
          <input type="text" placeholder="Username" className="auth-field" value={user} onChange={(e) => setUser(e.target.value)} required />
          <input type="password" placeholder="Password" className="auth-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="auth-btn">SignUp</button>
          <p className="auth-text">Already have an account? <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;