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
import { v4 as uuidv4 } from 'uuid';
import Annotation, { AnnotationData } from './Annotation';


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
    const [annotations, setAnnotations] = useState<AnnotationData[]>([]);

    
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
        const newContent = e.target.value;
        setHtml(newContent);
        
        // Check if any annotated text has been deleted
        setAnnotations(prev => prev.filter(annotation => {
            // If the annotated text isn't found in the content anymore, remove the annotation
            return newContent.includes(annotation.text);
        }));
    }  

    const handleBookmark = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const bookmark = createBookmark(range);
            setBookmarkPosition(bookmark);
        }
    };

    const handleAddAnnotation = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = selection.toString();
            
            // Get position of selected text
            const marker = document.createElement('span');
            range.insertNode(marker);
            const position = marker.offsetTop;
            marker.parentNode?.removeChild(marker);

            // Prompt for annotation comment
            const comment = prompt('Enter your annotation:');
            if (comment) {
                const newAnnotation: AnnotationData = {
                    id: uuidv4(),
                    text: selectedText,
                    comment,
                    position
                };
                setAnnotations(prev => [...prev, newAnnotation]);
            }
        }
    };

    const handleDeleteAnnotation = (id: string) => {
        setAnnotations(prev => prev.filter(a => a.id !== id));
    };

    const handleEditAnnotation = (id: string, newComment: string) => {
        setAnnotations(prev => 
            prev.map(a => a.id === id ? {...a, comment: newComment} : a)
        );
    };

    return (
        <div style={{ position: 'relative' }}>
            <div className="editor-container" style={{ width: 'calc(100% - 250px)' }}>
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
                        onAddAnnotation={handleAddAnnotation}
                    />
                </EditorProvider>
            </div>

            {/* Annotations container */}
            <div className="annotations-container">
                {annotations.map(annotation => (
                    <Annotation
                        key={annotation.id}
                        annotation={annotation}
                        onDelete={handleDeleteAnnotation}
                        onEdit={handleEditAnnotation}
                    />
                ))}
            </div>
        </div>
    );
}


export default FormattedInput;