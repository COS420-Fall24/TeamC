import React, {useState, useEffect} from "react";
import {sharedStateInterface} from "./UserInput";
import Dropdown from 'react-bootstrap/Dropdown';


export function OptionsMenu({stateArgument: sharedState, visible} : {stateArgument : sharedStateInterface; visible : boolean}) : React.JSX.Element{

    function setSize (fontSize : number){
        sharedState.setFontSize(fontSize);
        //sharedState.setVisible(false);
    }

    function setColor (fontColor : string){
        sharedState.setFontColor(fontColor);
        //sharedState.setVisible(false);
    }

    return (

        
        <div data-testid = "optionsmenu" className = "OptionsMenu" style = {{left:sharedState.x,top:sharedState.y,visibility:visible ? "visible" : "hidden"}}>
            
            <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Size
            </Dropdown.Toggle>

            <Dropdown.Menu>

                {Array.from({ length: 10 }, (_, index) => (
                    <Dropdown.Item key={index + 14} onClick={() => {setSize(index + 14)}}>{index + 14}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                Color
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => {setColor("#FF0000")}}>Red</Dropdown.Item>
                <Dropdown.Item onClick={() => {setColor("#00FF00")}}>Green</Dropdown.Item>
                <Dropdown.Item onClick={() => {setColor("#0000FF")}}>Blue</Dropdown.Item>
                <Dropdown.Item onClick={() => {setColor("#000000")}}>Black</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            
        </div>

    );
}