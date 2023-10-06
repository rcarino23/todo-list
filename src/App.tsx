import "./App.css";
import ViewList from "./components/ViewList";
import CreateTodo from "./components/CreateTodo";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <CreateTodo />
      <ViewList />
    </Router>
    </>
  );
}

export default App;
