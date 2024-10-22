import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";

function Sidebar() {
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
            </ul>
        </div>
    );
}

export default Sidebar;