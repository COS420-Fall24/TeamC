import logo from './logo.svg';
import './App.css';

import React from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Login} from "./pages/login";
import {Home} from "./pages/home"


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
