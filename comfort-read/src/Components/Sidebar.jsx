import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { DarkModeContext } from "../Context/DarkModeContext";
import { FocusModeContext } from "../Context/FocusModeContext";

function Sidebar() {
    const { toggleDarkMode } = useContext(DarkModeContext);
    const { isFocusMode, toggleFocusMode } = useContext(FocusModeContext);

    return (
        <div className={`Sidebar ${isFocusMode ? "collapsed" : "open"}`} data-testid="sidebar">
            <ul className="SidebarList">
            <li key="hide" className="row">
                <div id="hideButtons" onClick={toggleFocusMode}>{isFocusMode ? "Show All" : "Hide All"}</div>
            </li>
            {!isFocusMode && SidebarData.map((val, key)=> {
                return( 
                    <Link className = "SidebarLink" to = {val.url}>
                    <li key={key} className="row">
                        <div id="name">{val.name}</div>
                    </li>
                    </Link>
                )
            })}
            {!isFocusMode && 
            <li key = "mode" className = "row">
                <div id = "name" onClick={toggleDarkMode}>Toggle Dark Mode</div>
            </li>}
            </ul>
        </div>
    );
}

export default Sidebar;