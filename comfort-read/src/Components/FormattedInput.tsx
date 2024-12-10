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
import {summarizeText} from"../API/gemini";
import{useSummarize} from "../Context/SummarizeContext"

export interface ctxMenuStateInterface {
    x : number;
    y : number;
    setVisible: (newValue : boolean) => void;
}

function FormattedInput(){
    const [ctxMenuVisible, setCtxMenuVisible] = useState(false);
    const [ctxMenuState, setCtxMenuState] = useState<ctxMenuStateInterface>({ x: 0, y: 0, setVisible:setCtxMenuVisible});
    const{exportAsTxt, exportAsHtml, exportContent,setExportContent}=useContext(ExportFileContext);
    const[summary,setSummary]=useState("");
    const[loading,setLoading]=useState(false);//loading state
    const[error,setError]=useState<string|null>(null);//error state


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
    //export txt
    const  handleExportTxt=()=>{
    const plainText=html.replace(/<[^>]*>?/gm,''); /*strips html for plaintxt*/
    exportAsTxt(plainText);
   };
    //export html
    const handleExportHtml=()=>{
        exportAsHtml(html);
    };
    const handleSummarize=async()=>{
        if (!html.trim()){
            setError("Provide text to Summarize.");
            return;
        }
        setLoading(true);
        setError(null);
        try{
            const response=await fetch("https://localhost:3001/summarize",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text:html})
            })
            if(!response.ok){
                throw new Error("Failed to fetch summary.");
            }
        }catch(err){
            console.error("Error Summarizing",err);
            setError("Failure to Summarize Text. Try again.");
        }finally{
            setLoading(false);
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
                    </Toolbar>
                </Editor>
            </div>
            <CtxMenu stateArgument={ctxMenuState} visible={ctxMenuVisible} onBookmark={function (): void {
                    throw new Error("Function not implemented.");
                } } bookmarkPosition={null} onAddAnnotation={function (): void {
                    throw new Error("Function not implemented.");
                } }></CtxMenu>
            <div>
            {/*<button onClick={handleExportTxt}>Export as TXT</button>
            <button onClick={handleExportHtml}>Export as HTML</button>*/}
            </div>
        
        </EditorProvider>
        
        </div>
        
    );
}


export default FormattedInput;