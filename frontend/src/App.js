import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Userform from "./Userform";
import UserList from "./UserList"; 

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Userform />} />
      <Route path="/userlist" element={<UserList />} />
    </Routes>
  </Router>
  
  );
}

export default App;
