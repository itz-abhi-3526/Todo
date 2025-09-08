import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; 
function Note() {
  const nav = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const current = localStorage.getItem("current");
    if (auth !== "true") {
      nav("/");
    } else {
      setCurrentUser(current);
      const prenotes = JSON.parse(localStorage.getItem(`notes_${current}`)) || [];
      setNotes(prenotes);
    }
  }, [nav]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`notes_${currentUser}`, JSON.stringify(notes));
    }
  }, [notes, currentUser]);

  function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("current");
    nav("/");
  }

  const createNote = (e) => {
    e.preventDefault();
    if (title === "" || content === "") {
      alert("Please fill up both title and content...");
    } else {
      const newNote = { id: Date.now(), title, content };
      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");
    }
  };
  return (
    <div className="note-main">
      <div className="note-header">
        <h1>QuestPad</h1>
        <button type="submit" onClick={logout}>Logout</button>
      </div>
      <div className="note-body">
        <p className="note-greeting">Hey, {currentUser}! Ready to crush your goals?</p>
        <div className="note-input">
          <h1 className="note-head">Your Notes</h1>
          <input type="text" placeholder="Enter Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Enter Content..." value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
  );
}

export default Note;
