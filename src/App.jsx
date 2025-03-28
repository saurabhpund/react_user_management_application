import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import { ToastContainer } from "react-toastify";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Router>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
