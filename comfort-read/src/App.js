import './App.css';

import React from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Login} from "./Pages/login";
import {Home} from "./Pages/home"
import { DarkModeProvider } from './Context/DarkModeContext';
import { FocusProvider } from './Context/FocusModeContext';

function App() {
  return (
    <div>    
      <DarkModeProvider>
      <FocusProvider>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/login" element = {<Login/>}/>
        </Routes>
      </Router>
      </FocusProvider>
      </DarkModeProvider>
      </div>

  );
}

export default App;
