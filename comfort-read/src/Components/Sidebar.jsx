import "../App.css";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import {useContext, useState } from 'react';
import { DarkModeContext } from "../Context/DarkModeContext";
import { FocusModeContext } from "../Context/FocusModeContext";
import {ExportFileContext} from "../Context/ExportFileContext";
import {Modal, Button} from "react-bootstrap";
import { exportAsHtml } from "../Context/exportFile";


function Sidebar() {
    const { toggleDarkMode } = useContext(DarkModeContext);
    const { isFocusMode, toggleFocusMode } = useContext(FocusModeContext);
    const { exportAsTxt, exportAsHtml} = useContext(ExportFileContext);

    const [showExportModal,setShowExportModal]=useState(false)
    const handleExport = (action) =>{
        if (action === "export") {
            setShowExportModal(true); // show on user click
        }
    };
    const handleExportChoice=(format) =>{
        if (format==="txt"){
            exportAsTxt(); //exp txt
        } else if (format==="html"){
            exportAsHtml(); //exp html
        }
        setShowExportModal(false);//close after selection
    }
    return (
        <div className={`Sidebar ${isFocusMode ? "collapsed" : "open"}`} data-testid="sidebar">
            <ul className="SidebarList">
            <li key="hide" className="row">
                <div id="hideButtons" onClick={toggleFocusMode}>{isFocusMode ? "Show All" : "Hide All"}</div>
            </li>
            {!isFocusMode && SidebarData.map((val, key)=> {
                if (val.name==="Export"){
                    return (
                        <li key={key} className="row" onClick={() => handleExport(val.action)}>
                            <div id="name">{val.name}</div>
                        </li>
                    ); 
                }
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
            <Modal show={showExportModal} onHide={()=> setShowExportModal (false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Pick Export Format</Modal.Title>
                    <p>Which format would you like to export as?</p>
                    <Button variant="secondary" onClick={() =>handleExportChoice("txt")}>
                        Export as txt
                    </Button>
                    <Button variant="primary"onClick={()=>handleExportChoice("html")}>
                        Export as html
                    </Button>
                </Modal.Header>
            </Modal>
        </div>
    );
}
export default Sidebar;