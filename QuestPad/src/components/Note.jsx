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

  const deleteNote = (id) => {
    const delNotes = notes.filter((i) => i.id !== id);
    setNotes(delNotes);
  };

  const updateNote = () => {
    const updatedNotes = notes.map((i) =>
      i.id === editingNote.id ? editingNote : i
    );
    setNotes(updatedNotes);
    setEditingNote(null);
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
          <button type="submit" onClick={createNote}>Add a Note</button>
        </div>
        {notes.length === 0 ? (<p>No Notes yet. Get started by writing your first one...</p>) : (
          notes.map((i) => (
            <div key={i.id} className="note-card">
              <h2>{i.title}</h2>
              <p>{i.content}</p>
              <button type="submit" onClick={() => deleteNote(i.id)}>Delete</button>
              <button type="submit" onClick={() => setEditingNote(i)}>Update</button>
            </div>
          ))
        )}
        {editingNote && (
          <div className="note-edit">
            <h2>Edit Note</h2>
            <input type="text" value={editingNote.title} onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })} />
            <textarea value={editingNote.content} onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })} />
            <button type="submit" onClick={updateNote}>Save Changes</button>
            <button type="submit" onClick={() => setEditingNote(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Note;