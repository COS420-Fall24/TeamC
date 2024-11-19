import React, {useState} from "react";
import "../App.css";
import { OptionsMenu } from "./OptionsMenu";
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';


export interface sharedStateInterface {
    x : number;
    y : number;
    setFontSize: (newValue: number) => void;
    setVisible: (newValue : boolean) => void;
    setFontColor: (newValue : string) => void;
}

function UserInput() {

    
    const [fontSize, setFontSize] = useState<number>(15);
    const [visible, setVisible] = useState(false);
    const [fontColor, setFontColor] = useState<string>("Black");

    const toggleChildVisibility = (vis : boolean) => {
        setVisible(vis);
    };

    const [sharedState, setSharedState] = useState<sharedStateInterface>({ x: 0, y: 0, setFontSize:setFontSize,setVisible:toggleChildVisibility, setFontColor:setFontColor});

    const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {

        // updates option menu position and makes it visible on screen.

        event.preventDefault();
        setVisible(true);
        setSharedState({ x: event.clientX, y: event.clientY, setFontSize:setFontSize,setVisible:toggleChildVisibility, setFontColor:setFontColor});
      
    };

    const hideMenu = (event: React.MouseEvent<HTMLElement>) => {
        setVisible(false);
    }
    

    return (
        <Form className = "UserInput">
            <FormGroup onClick = {hideMenu} onContextMenu = {handleRightClick} className="mb-3" controlId="userInputForm.ControlTextarea">
                
                <FormLabel>Input your text in the box below</FormLabel>
                {/*Unsure how to create a bootstrap textarea that does not change size based on font size*/}
                {/*<FormControl  as="textarea" rows={8} size="lg"/>*/}
                <textarea data-testid = "text" name="" id="primaryTextBox" style = {{fontSize:fontSize, resize:"none",color:fontColor}} placeholder="Start typing here..."></textarea>
            </FormGroup>
            <OptionsMenu stateArgument = {sharedState} visible = {visible}></OptionsMenu>
        </Form>
    )
}

export default UserInput;