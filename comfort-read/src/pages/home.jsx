import './../App.css';
import Sidebar from '../Components/Sidebar';
import React from "react";
import {Link} from "react-router-dom";
export function Home(){
    return (
        <>

    <div className="App">
        <Sidebar></Sidebar>
        
        <div className = "content">
            <div>
                <h1>ComfortRead Home Page</h1>
            </div>
        </div>  
    </div>
    
    </>
    );
}