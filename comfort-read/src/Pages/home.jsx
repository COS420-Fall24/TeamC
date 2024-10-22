import './../App.css';
import Sidebar from '../Components/Sidebar';
import UserInput from '../Components/UserInput';
import React from "react";
import {Link} from "react-router-dom";
export function Home(){
    return (
        <>

    <div className="App">
        <Sidebar></Sidebar>
        
        <div className = "content">
            <h1>ComfortRead Home Page</h1>
            
            <UserInput></UserInput>
        </div>  
    </div>
    
    </>
    );
}