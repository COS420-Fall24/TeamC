import './App.css';

import React from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Login} from "./Pages/login";
import {Home} from "./Pages/home"
import { DarkModeProvider } from './Context/DarkModeContext';
import { FocusProvider } from './Context/FocusModeContext';
import { ExportFileProvider } from './Context/ExportFileContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SummarizeProvider} from './Context/SummarizeContext';
import SummarizeText from './Components/SummarizeText';
function App() {
  return (
    <div>  
      <DarkModeProvider>
        <FocusProvider>
      <   ExportFileProvider>
            <SummarizeProvider>
              <Router>
                <Routes>
                  <Route path = "/" element = {<Home/>}/>
                  <Route path = "/login" element = {<Login/>}/>
              </Routes>
              </Router>
            </SummarizeProvider>
          </ExportFileProvider>
        </FocusProvider>
      </DarkModeProvider>
      
      
    </div>  
  );
}

export default App;
