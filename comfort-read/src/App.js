import './App.css';

import React from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Login} from "./Pages/login";
import {Home} from "./Pages/home"


function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/login" element = {<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
