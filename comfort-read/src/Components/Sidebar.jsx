import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import {useContext} from 'react';
import { DarkModeContext } from "../Context/DarkModeContext";

function Sidebar() {
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);

    return (
        <div className="Sidebar">
            <ul className="SidebarList">
            {SidebarData.map((val, key)=> {

                return( 
                    
                    <Link className = "SidebarLink" to = {val.url}>
                    <li key={key} className="row">
                        
                            <div id="name">{val.name}</div>
                        
                    </li>
                    </Link>
                    
                )
                
    
            })}
            
            <li key = "mode" className = "row">
                <div id = "name" onClick={toggleDarkMode}>Toggle Dark Mode</div>
            </li>
            </ul>
        </div>
    );
}

export default Sidebar;