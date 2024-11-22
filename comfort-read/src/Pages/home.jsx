import './../App.css';
import Sidebar from '../Components/Sidebar';
import React from "react";
import {Link} from "react-router-dom";
import { DarkModeContext } from '../Context/DarkModeContext';
import {useContext} from 'react';
import FormattedInput from '../Components/FormattedInput';
import { FocusModeContext } from "../Context/FocusModeContext";import { Navbar } from 'react-bootstrap';



export function Home(){
    const {theme} = useContext(DarkModeContext);
    const { isFocusMode } = useContext(FocusModeContext);
  
    let editorClass = isFocusMode ? 'editor-collapsed' : 'editor-open';

    return (
        
        <>
    
    <div id="App" className = {theme} data-testid="App">
        
        <Sidebar></Sidebar>
        
        <div id = "content" className={editorClass}>
            <h1>ComfortRead Home Page</h1>
            
            <FormattedInput></FormattedInput>
        </div>  
    </div>
    
    </>
    );
}