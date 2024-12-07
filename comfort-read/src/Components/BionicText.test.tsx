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
import BionicText from "./BionicText";
import '@testing-library/jest-dom';
import { ErrorBoundary } from "react-error-boundary";


document.execCommand = jest.fn()

describe("Bionic text feature works correctly", () => {
 
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks()
    });

    test('Check if Bionic button exists', () => {
        render(
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <DarkModeProvider>
                    <FocusProvider>
                        <ExportFileProvider>               
                            <BrowserRouter>
                                <BionicText 
                                    html="" 
                                    setHtml={() => {}}
                                />
                            </BrowserRouter>
                        </ExportFileProvider>
                    </FocusProvider>
                </DarkModeProvider>
            </ErrorBoundary>
        );
        
        // Find and verify Bionic button exists
        const bionicButton = screen.getByRole('button', { name: /Bionic/i });
        expect(bionicButton).toBeInTheDocument();
    });

    test('Check if first letter is bolded on click when off', async () => {
        const mockSetHtml = jest.fn();
        render(
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <DarkModeProvider>
                    <FocusProvider>
                        <ExportFileProvider>               
                            <BrowserRouter>
                                <BionicText 
                                    html="test text" 
                                    setHtml={mockSetHtml}
                                />
                            </BrowserRouter>
                        </ExportFileProvider>
                    </FocusProvider>
                </DarkModeProvider>
            </ErrorBoundary>
        );

        const bionicButton = screen.getByRole('button', { name: /Bionic/i });
        
        // Click to apply bionic formatting
        fireEvent.click(bionicButton);
        expect(mockSetHtml).toHaveBeenCalledWith('<span><strong>te</strong>st <strong>te</strong>xt</span>');
    });

    test('Check if first letter is un-bolded on click when on', async () => {
        const mockSetHtml = jest.fn();
        render(
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <DarkModeProvider>
                    <FocusProvider>
                        <ExportFileProvider>               
                            <BrowserRouter>
                                <BionicText 
                                    html="<span><strong>te</strong>st <strong>te</strong>xt</span>" 
                                    setHtml={mockSetHtml}
                                />
                            </BrowserRouter>
                        </ExportFileProvider>
                    </FocusProvider>
                </DarkModeProvider>
            </ErrorBoundary>
        );

        const bionicButton = screen.getByRole('button', { name: /Bionic/i });
        
        // Click to apply bionic formatting
        fireEvent.click(bionicButton);
        expect(mockSetHtml).toHaveBeenCalledWith('<span>test text</span>');
    });
});
