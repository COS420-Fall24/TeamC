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
    useEditorState,
    ContentEditable
  } from 'react-simple-wysiwyg';

import { Button, Dropdown } from "react-bootstrap";
import { FocusModeContext } from "../Context/FocusModeContext";
import Sidebar from "./Sidebar";

import {ctxMenuStateInterface} from "./FormattedInput";
import { createBookmark, scrollToBookmark } from './BookmarkUtils';

interface CtxMenuProps {
    stateArgument: ctxMenuStateInterface;
    visible: boolean;
    onBookmark: () => void;
    bookmarkPosition: number | null;
    onAddAnnotation: () => void;
}

function CtxMenu({stateArgument: sharedState, visible, onBookmark, bookmarkPosition, onAddAnnotation}: CtxMenuProps) {
    
    const editorState = useEditorState();
    const { $el, $selection } = editorState;
    
    function setColor(color:string) {
        $el?.focus();
        document.execCommand('forecolor',false,color); 
    }

    function setFontSize(size : number){
        $el?.focus();
        document.execCommand('fontSize',false,size.toString());
    }

    function highlight(){
        $el?.focus();
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
            
            <Button 
                variant="secondary" 
                onClick={onBookmark}
                style={{marginRight: '5px'}}
            >
                Set Bookmark
            </Button>

            {bookmarkPosition !== null && (
                <Button 
                    variant="secondary" 
                    onClick={() => scrollToBookmark(bookmarkPosition)}
                >
                    Go to Bookmark
                </Button>
            )}
            
            <Button 
                variant="info" 
                onClick={onAddAnnotation}
                style={{marginRight: '5px'}}
            >
                Add Annotation
            </Button>
            
        </div>
    </div>

    );
}

export default CtxMenu;