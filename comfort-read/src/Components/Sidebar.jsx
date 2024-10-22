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
                    
                    <li key={key} className="row">
                        <Link className = "SidebarLink" to = {val.url}>
                            <div id="name">{val.name}</div>
                        </Link>
                    </li>
                   
                    
                )
                
    
            })}
            </ul>
        </div>
    );
}

export default Sidebar;