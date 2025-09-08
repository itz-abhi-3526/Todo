import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Todo from "./components/Todo.jsx";
import Note from "./components/Note.jsx";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dash" element={<Dashboard />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/note" element={<Note />} />
    </Routes>
  );
}

export default App;
