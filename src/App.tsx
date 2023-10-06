import "./App.css";
import CreateTodo from "./components/CreateTodo";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <>
  
      <Header/>

      <Router>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<CreateTodo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
