import './../App.css';
import Sidebar from '../Components/Sidebar';
import UserInput from '../Components/UserInput';
import React from "react";
import {Link} from "react-router-dom";
import { DarkModeContext, DarkModeProvider } from '../Context/DarkModeContext';
import {useContext} from 'react';



export function Home(){
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);

    var cname = "light";

    if(darkMode === true){
        cname = "dark";
    }

    console.log("working?:" + darkMode);
    

    return (
        
        <>
    
    <div className="App">
        <Sidebar></Sidebar>
        
        <div id = "content" className = {cname}>
            <h1>ComfortRead Home Page</h1>
            
            <UserInput></UserInput>
        </div>  
    </div>
    
    </>
    );
}