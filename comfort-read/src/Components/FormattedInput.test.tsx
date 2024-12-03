import React from "react";
import { useContext } from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { FocusProvider, FocusModeContext } from "../Context/FocusModeContext";
import { Home } from "../Pages/home";
import { DarkModeProvider } from "../Context/DarkModeContext";
import { ExportFileProvider } from "../Context/ExportFileContext";
import { BrowserRouter } from 'react-router-dom'
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import FormattedInput from "./FormattedInput";
import '@testing-library/jest-dom'

document.execCommand = jest.fn()

describe("Text size and color can be changed", () => {

    beforeAll(() => {
        global.document.execCommand = jest.fn();
    });
    
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks()
    });

    test('renders correctly', () => {
        render(
            
            <DarkModeProvider>
                <FocusProvider>
                    <ExportFileProvider>               
                    <Router>
                     <Routes>
                    <Route path = "/" element = {<FormattedInput/>}/>
                     </Routes>
                     </Router>
                    </ExportFileProvider>
                </FocusProvider>
            </DarkModeProvider>
            );
        expect(screen.getByTestId('editor')).toBeInTheDocument();
    });

    test('font size dropdown works correctly', async () => {
        render(
            
            <DarkModeProvider>
                <FocusProvider>
                    <ExportFileProvider>               
                    <Router>
                     <Routes>
                    <Route path = "/" element = {<FormattedInput/>}/>
                     </Routes>
                     </Router>
                    </ExportFileProvider>
                </FocusProvider>
            </DarkModeProvider>
            );

        const editor = screen.getByTestId("editor");
        
        await userEvent.type(editor, 'Hello, world!');
        expect(editor).toBeInTheDocument();
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        userEvent.dblClick(editor);
        fireEvent.contextMenu(editor);
        
        fireEvent.click(screen.getByText('Size')); // Open the dropdown

        const sizeOption = screen.getByText('3');
        fireEvent.click(sizeOption);

        expect(document.execCommand).toHaveBeenCalledWith('fontSize', false, '3');
    });

    test('color dropdown works correctly', async () => {
        render(
            
            <DarkModeProvider>
                <FocusProvider>
                    <ExportFileProvider>               
                    <Router>
                     <Routes>
                    <Route path = "/" element = {<FormattedInput/>}/>
                     </Routes>
                     </Router>
                    </ExportFileProvider>
                </FocusProvider>
            </DarkModeProvider>
            );

        const editor = screen.getByTestId("editor");
        
        await userEvent.type(editor, 'Hello, world!');
        expect(editor).toBeInTheDocument();
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        userEvent.dblClick(editor);
        fireEvent.contextMenu(editor);

        fireEvent.click(screen.getByText('Color')); // Open the dropdown

        const colorOption = screen.getByText('Green');
        fireEvent.click(colorOption);

        expect(document.execCommand).toHaveBeenCalledWith('forecolor', false, 'Green');
    });

    test('highlight button works correctly', async () => {
        render(
            
            <DarkModeProvider>
                <FocusProvider>
                    <ExportFileProvider>               
                    <Router>
                     <Routes>
                    <Route path = "/" element = {<FormattedInput/>}/>
                     </Routes>
                     </Router>
                    </ExportFileProvider>
                </FocusProvider>
            </DarkModeProvider>
            );
        const editor = screen.getByTestId("editor");
        
        await userEvent.type(editor, 'Hello, world!');
        expect(editor).toBeInTheDocument();
        expect(screen.getByText("Hello, world!")).toBeInTheDocument();
        
        userEvent.dblClick(editor);
        fireEvent.contextMenu(editor);
        
        const highlightButton = screen.getByText('Highlight');
        fireEvent.click(highlightButton);

        expect(document.execCommand).toHaveBeenCalledWith('backcolor', false, 'yellow');
    });
    
    test('Text can be read with TTS', async () => {
        render(
            
            <DarkModeProvider>
                <FocusProvider>
                    <ExportFileProvider>               
                    <Router>
                     <Routes>
                    <Route path = "/" element = {<FormattedInput/>}/>
                     </Routes>
                     </Router>
                    </ExportFileProvider>
                </FocusProvider>
            </DarkModeProvider>
            );
        const tts = screen.getByTestId("tts");
        await userEvent.click(tts);

        expect(window.speechSynthesis.speak).toBeCalled();


        });
});
