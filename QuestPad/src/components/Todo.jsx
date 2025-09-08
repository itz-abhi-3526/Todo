import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; 
function Todo() {
  const nav = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const current = localStorage.getItem("current");
    if (auth !== "true") {
      nav("/");
    } else {
      setCurrentUser(current);
      const preTodos = JSON.parse(localStorage.getItem(`todos_${current}`)) || [];
      setTodos(preTodos);
    }
  }, [nav]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`todos_${currentUser}`, JSON.stringify(todos));
    }
  }, [todos, currentUser]);

  function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("current");
    nav("/");
  }

  const createTodo = (e) => {
    e.preventDefault();
    if (task === "") {
      alert("Please enter a task...");
    } else {
      const newTodo = { id: Date.now(), task, completed: false };
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  const deleteTodo = (id) => {
    const filtered = todos.filter((i) => i.id !== id);
    setTodos(filtered);
  };

  const toggleComplete = (id) => {
    const updated = todos.map((i) =>
      i.id === id ? { ...i, completed: !i.completed } : i
    );
    setTodos(updated);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((i) =>
      i.id === editingTodo.id ? editingTodo : i
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  return (
    <div className="todo-main">
      <div className="todo-header">
        <h1>QuestPad</h1>
        <button type="submit" onClick={logout}>Logout</button>
      </div>
      <div className="todo-body">
        <p className="todo-greeting">Hey, {currentUser}! Here are your tasks:</p>
        <div className="todo-input">
          <input type="text" placeholder="Enter a task..." value={task} onChange={(e) => setTask(e.target.value)} />
          <button onClick={createTodo}>Add Task</button>
        </div>
        {todos.length === 0 ? (
          <p>No tasks yet. Add one!</p>
        ) : (
          todos.map((i) => (
            <div key={i.id} className="todo-card">
              <span style={{textDecoration: i.completed ? "line-through" : "none",}}>{i.task}</span>
              <button onClick={() => toggleComplete(i.id)}>{i.completed ? "Undo" : "Done"}</button>
              <button onClick={() => deleteTodo(i.id)}>Delete</button>
              <button onClick={() => setEditingTodo(i)}>Update</button>
            </div>
          ))
        )}
        {editingTodo && (
          <div className="edit-todo">
            <h2>Edit Task</h2>
            <input type="text" value={editingTodo.task} onChange={(e) => setEditingTodo({ ...editingTodo, task: e.target.value })} />
            <button onClick={updateTodo}>Save</button>
            <button onClick={() => setEditingTodo(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;