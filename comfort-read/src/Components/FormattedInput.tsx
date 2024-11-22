import React, {useState, useContext} from "react";

import { 
    BtnBold, 
    BtnItalic, 
    ContentEditableEvent, 
    Editor, 
    EditorProvider, 
    Toolbar,
    BtnUndo,
    BtnRedo,
    useEditorState
  } from 'react-simple-wysiwyg';
import { Button, Dropdown } from "react-bootstrap";
import { FocusModeContext } from "../Context/FocusModeContext";

export interface ctxMenuStateInterface {
    x : number;
    y : number;
    setVisible: (newValue : boolean) => void;
}

function CtxMenu({stateArgument: sharedState, visible} : {stateArgument : ctxMenuStateInterface; visible : boolean}){
    
    const editorState = useEditorState();
    
        const { $el, $selection } = editorState;
        
        if (document.activeElement !== $el) {
        $el?.focus();
        }

        function setColor(color:string) {
        document.execCommand('forecolor',false,color); 
        }

        function setFontSize(size : number){
        console.log(size + " " + size.toString());
        document.execCommand('fontSize',false,size.toString());
        }

        function highlight(){
        document.execCommand('backcolor',false,"yellow");
        }

        // TODO font spacing

        // TODO font name EXAMPLE: document.execCommand('fontName', false, 'Arial');

return (

<div>

        <div data-testid = "optionsmenu" className = "OptionsMenu" style = {{left:sharedState.x,top:sharedState.y,visibility:visible ? "visible" : "hidden"}}>
            
            <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Size
            </Dropdown.Toggle>

            <Dropdown.Menu>

                {Array.from({ length: 7 }, (_, index) => (
                    <Dropdown.Item key={index+1} onClick={() => {setFontSize(index + 1)}}>{index + 1}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                Color
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => {setColor("Red")}}>Red</Dropdown.Item>
                <Dropdown.Item onClick={() => {setColor("Green")}}>Green</Dropdown.Item>
                <Dropdown.Item onClick={() => {setColor("Blue")}}>Blue</Dropdown.Item>
                <Dropdown.Item onClick={() => {setColor("Black")}}>Black</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>

            <Button variant = "warning" onClick={highlight}>Highlight</Button>
            
        </div>
</div>

);
}

function FormattedInput(){
    const [ctxMenuVisible, setCtxMenuVisible] = useState(false);

    const [ctxMenuState, setCtxMenuState] = useState<ctxMenuStateInterface>({ x: 0, y: 0, setVisible:setCtxMenuVisible});

    const [html, setHtml] = useState('');

    const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
        // updates option menu position and makes it visible on screen.
        event.preventDefault();
        setCtxMenuVisible(true);
        setCtxMenuState({ x: event.clientX + 25, y: event.clientY - 50, setVisible:setCtxMenuVisible});
      
    };

    const hideMenu = (event: React.MouseEvent<HTMLElement>) => {
        //event.preventDefault();
        setCtxMenuVisible(false);
    }

    
    
    function onChange(e : ContentEditableEvent) {
        setHtml(e.target.value);
    }

    return (
        <div id = "wysiwyg-edtitor"> 
            <EditorProvider>
            
            <div onMouseDown = {hideMenu} onContextMenu = {handleRightClick}>
                <Editor id = "editor" style = {{textAlign:"left"}} spellCheck = "false" value={html} onChange={onChange}>
                    <Toolbar>
                        <BtnUndo/>
                        <BtnRedo/>
                        <BtnBold />
                        <BtnItalic />
                    </Toolbar>
                </Editor>
            </div>
            <CtxMenu stateArgument={ctxMenuState} visible = {ctxMenuVisible}></CtxMenu>
        </EditorProvider>

        </div>
    );
}


export default FormattedInput;