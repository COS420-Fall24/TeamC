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

export interface ctxMenuStateInterface {
    x : number;
    y : number;
    setVisible: (newValue : boolean) => void;
}

interface synthesisInterface{
    rate : number;
    voice : number;
    pitch : number;
    volume : number;
}

function FormattedInput(){
    const [ctxMenuVisible, setCtxMenuVisible] = useState(false);
    const [ctxMenuState, setCtxMenuState] = useState<ctxMenuStateInterface>({ x: 0, y: 0, setVisible:setCtxMenuVisible});
    const{exportAsTxt, exportAsHtml, exportContent,setExportContent}=useContext(ExportFileContext);
    const utteranceRef = useRef(new SpeechSynthesisUtterance());
    const [synthesis, setSynthesis] = useState<synthesisInterface>({rate : 1,voice : 0,pitch: 1,volume:1});
    const [html, setHtml] = useState('');

    const handleSpeak = () => {

        
        const div = document.createElement("div");
        div.innerHTML = html;

        const utterance = new SpeechSynthesisUtterance(div.innerText);
        if(utterance !== undefined && synthesis.pitch !== undefined && synthesis.rate !== undefined && synthesis.volume !== undefined && synthesis.voice !== undefined && utterance.voice !== undefined && utterance.rate !== undefined && utterance.pitch !== undefined && utterance.volume !== undefined){
        utterance.rate = synthesis.rate;
        utterance.pitch = synthesis.pitch;
        utterance.volume = synthesis.volume;
        utterance.voice = speechSynthesis.getVoices()[synthesis.voice];
        utteranceRef.current = utterance;

        }

        window.speechSynthesis.speak(utterance);
    }

    const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
        // updates option menu position and makes it visible on screen.
        event.preventDefault();

        if(!ctxMenuVisible){
            setCtxMenuVisible(true);
            setCtxMenuState({ x: event.clientX + 25, y: event.clientY - 50, setVisible:setCtxMenuVisible});
        }
    };

    const hideMenu = (event: React.MouseEvent<HTMLElement>) => {
        //event.preventDefault();
        if(ctxMenuVisible){
            setCtxMenuVisible(false);
        }
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

    const voices = window.speechSynthesis.getVoices();

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

                        {/*Added if statement to prevent a queue of TTS requests while one is already in progress*/}
                        <button data-testid = "tts" onClick = {() => {
                            if (!window.speechSynthesis.speaking) {
                                handleSpeak();
                            }
                        }}>TTS</button>
                        <select id="ttsOption" value = {synthesis.voice} onChange={(e) => {
                            if (!window.speechSynthesis.speaking) {
                                setSynthesis({...synthesis,voice:parseInt(e.target.value)})
                            }
                        }}>
                            {voices.map((voice,index)=>(
                                <option key = {index} value = {index}>{voice.name}</option>
                            ))}
                        </select>

                        {/*Speed*/}
                        <label className = "ttsLabel" htmlFor = "speed">Speed:</label>
                        <input className = "ttsCtrl" name = "speed" type = "range" min = "5" max = "20" value = {synthesis.rate * 10} onChange = {(e) => setSynthesis({...synthesis,rate:parseInt(e.target.value)/10})}/>
                        {/*Pitch*/}
                        {/*<input type = "range" min = "5" max = "20" value = {synthesis.pitch * 10} onChange = {(e) => setSynthesis({...synthesis,pitch:parseInt(e.target.value)/10})}/>*/}
                        {/*Volume*/}
                        <label className = "ttsLabel" htmlFor = "vol">Volume:</label>
                        <input className = "ttsCtrl" name = "vol" type = "range" min = "0" max = "10" value = {synthesis.volume * 10} onChange = {(e) => setSynthesis({...synthesis,volume:parseInt(e.target.value)/10})}/>

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