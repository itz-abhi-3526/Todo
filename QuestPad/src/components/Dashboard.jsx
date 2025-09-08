import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./style.css"; 
function Dashboard() {
  const nav = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const current = localStorage.getItem("current");
    if(auth!="true"){
      nav("/");
    }
    else{
      setCurrentUser(current);
    }
  });
  function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("current");
    nav("/");
  }

  function Todo() {
    nav("/todo")
  }
  function Note() {
    nav("/note")
  }
  return(
    <div className="main">
      <div className="header">
        <h1>QuestPad</h1>
        <button type="submit" onClick={logout}>Logout</button>
      </div>
      <div className="body">
          <p className="greeting">Hey, {currentUser}! Ready to crush your goals?</p>
            <div className="todo">
              <button type="submit" onClick={Todo}>Plan my day</button>
            </div>
            <div className="note">
              <button type="submit" onClick={Note}>Add a Note</button>
            </div>
      </div>
    </div>
  )
}

export default Dashboard;
