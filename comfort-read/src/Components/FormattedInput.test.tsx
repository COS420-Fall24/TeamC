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

document.execCommand = jest.fn()


describe("Text size and color can be changed", () => {
    
    test("Font size can be changed", async () => {
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
        
        const sizeDropdown = screen.getByText("Size");

        expect(sizeDropdown).toBeInTheDocument();
        fireEvent.click(sizeDropdown);

        const sizeOption = screen.getByText("7");

        expect(sizeOption).toBeInTheDocument();
        fireEvent.click(sizeOption);

        
    });

    test("Font color can be changed", async () => {
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
        
        const sizeDropdown = screen.getByText("Color");

        expect(sizeDropdown).toBeInTheDocument();
        fireEvent.click(sizeDropdown);

        const colorOption = screen.getByText("Red");

        expect(colorOption).toBeInTheDocument();
        fireEvent.click(colorOption);   
    });

    test("Font can be highlighted", async () => {
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
        
        const highlightButton = screen.getByText("Highlight");

        expect(highlightButton).toBeInTheDocument();
        fireEvent.click(highlightButton);

        
    });
});
