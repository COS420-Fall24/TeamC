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
import {ExportFileContext} from "../Context/ExportFileContext";
import CtxMenu from "./CtxMenu";

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
        setExportContent(html);
    }
    //export txt
    const  handleExportTxt=()=>{
    const plainText=html.replace(/<[^>]*>?/gm,''); /*strips html for plaintxt*/
    exportAsTxt(plainText);
   };
    //export html
    const handleExportHtml=()=>{
        exportAsHtml(html);
    };
    return (
        <div>
            <Sidebar />
        <div id = "wysiwyg-edtitor" ></div>
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
            <div>
            {/*<button onClick={handleExportTxt}>Export as TXT</button>
            <button onClick={handleExportHtml}>Export as HTML</button>*/}
            </div>
        
        </EditorProvider>

        </div>
    );
}


export default FormattedInput;