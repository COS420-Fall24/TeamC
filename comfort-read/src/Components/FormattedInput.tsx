import React, {useState, useContext, useRef} from "react";

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
import {ExportFileContext} from "../Context/ExportFileContext";
import CtxMenu from "./CtxMenu";
import BionicText from "./BionicText";
import { TTS } from "./TTS";
import { createBookmark, scrollToBookmark } from './BookmarkUtils';

export interface ctxMenuStateInterface {
    x : number;
    y : number;
    setVisible: (newValue : boolean) => void;
}

function FormattedInput(){
    const [ctxMenuVisible, setCtxMenuVisible] = useState(false);
    const [ctxMenuState, setCtxMenuState] = useState<ctxMenuStateInterface>({ x: 0, y: 0, setVisible:setCtxMenuVisible});
    const{exportAsTxt, exportAsHtml, exportContent,setExportContent}=useContext(ExportFileContext);
    
    const [html, setHtml] = useState('');
    const [bookmarkPosition, setBookmarkPosition] = useState<number | null>(null);

    
    const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
        // updates option menu position and makes it visible on screen.
        event.preventDefault();

        if(!ctxMenuVisible){
            setCtxMenuVisible(true);
            setCtxMenuState({ x: event.clientX + 25, y: event.clientY - 50, setVisible:setCtxMenuVisible});
        }
    };

    const hideMenu = (event: React.MouseEvent<HTMLElement>) => {
        if(ctxMenuVisible){
            setCtxMenuVisible(false);
        }
    }
    
    function onChange(e : ContentEditableEvent) {
        setHtml(e.target.value);
        
    }  

    const handleBookmark = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const bookmark = createBookmark(range);
            setBookmarkPosition(bookmark);
        }
    };

    return (
        <div>
            
        <div id = "wysiwyg-edtitor" ></div>
            <EditorProvider>
            
            <div onBlur={() => {setExportContent(html);}} onMouseDown = {hideMenu} onContextMenu = {handleRightClick}>
                <Editor data-testid = "editor" id = "editor" style = {{textAlign:"left"}} spellCheck = "false" value={html} onChange={onChange}>
                    <Toolbar>
                        <BtnUndo/>
                        <BtnRedo/>
                        <BtnBold />
                        <BtnItalic />

                        {/*Call BionicText component*/}
                        <BionicText html={html} setHtml={setHtml} />
                        <TTS html={html}/>
                        
                    </Toolbar>
                </Editor>
            </div>
            <CtxMenu 
                stateArgument={ctxMenuState} 
                visible={ctxMenuVisible} 
                onBookmark={handleBookmark}
                bookmarkPosition={bookmarkPosition}
            />
            <div>
            </div>
        
        </EditorProvider>

        </div>
    );
}


export default FormattedInput;