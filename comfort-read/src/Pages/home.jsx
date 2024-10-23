import './../App.css';
import Sidebar from '../Components/Sidebar';
import UserInput from '../Components/UserInput';
import React from "react";
import {Link} from "react-router-dom";
import { DarkModeContext, DarkModeProvider } from '../Context/DarkModeContext';
import {useContext} from 'react';



export function Home(){
    const {theme} = useContext(DarkModeContext);

    return (
        
        <>
    
    <div id="App" className = {theme}>
        <Sidebar></Sidebar>
        
        <div id = "content">
            <h1>ComfortRead Home Page</h1>
            
            <UserInput></UserInput>
        </div>  
    </div>
    
    </>
    );
}