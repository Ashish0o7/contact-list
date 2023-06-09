import "./App.css";
import Landing from "./Landing";

import Login from "./Login";
import Register from "./Register";

import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import BudgetTracker from "./Dailyexp";
import Mainpg from "./main";
import DallEPage from "./dallE";

function App() {
  const [userEmail, setUserEmail] = useState('');
  
  return (
    <div>
      
      <Router>
      <Routes>
        <Route exact path="/" element={<Mainpg/>} />
          <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
          <Route path="/Dailyexp" element={<BudgetTracker/>}/>
          <Route path="/contacts" element={<Landing/>}/>
          <Route path="/register" element={<Register setUserEmail={setUserEmail}/>} />
          <Route path="/dallE" element={<DallEPage/>}/>
      </Routes>
    </Router>
      
   
    </div>
  );
}

export default App;
