import "./App.css";
import Landing from "./Landing";

import Login from "./Login";
import Register from "./Register";

import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // use HashRouter instead of BrowserRouter


function App() {
  const [userEmail, setUserEmail] = useState('');
  
  return (
    <div>
      
      <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
         
          <Route path="/register" element={<Register setUserEmail={setUserEmail}/>} />
      </Routes>
    </Router>
      
   
    </div>
  );
}

export default App;
