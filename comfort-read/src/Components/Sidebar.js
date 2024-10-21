import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";


function Sidebar() {
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
            {SidebarData.map((val, key)=> {

                return( 
                    <li key={key} className="row">
                        <div id="name">{val.name}</div>
                    </li>
                    
                )
                
    
            })}
            </ul>
        </div>
    );
}

export default Sidebar;