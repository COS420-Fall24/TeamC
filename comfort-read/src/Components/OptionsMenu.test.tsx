import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { Router } from 'react-router';


describe("Testing the ability to change font size", () => {
    test("The OptionsMenu is not visible", () => {
        render(<App/>);
        const optionsMenu = screen.getByTestId("optionsmenu");
        expect(optionsMenu).not.toBeVisible();
    });
    test("The OptionsMenu is visible after right clicking the textarea", () => {
        render(<App/>);
        const textArea = screen.getByTestId("text");
        expect(textArea).toBeInTheDocument();
        fireEvent.contextMenu(textArea);
        
        const optionsMenu = screen.getByTestId("optionsmenu");
        expect(optionsMenu).toBeVisible();
    });
    test("The font size of the text can be changed", () => {
        render(<App/>);
        const textArea = screen.getByTestId("text");
        expect(textArea).toBeInTheDocument();
        fireEvent.contextMenu(textArea);
        
        const optionsMenu = screen.getByTestId("optionsmenu");
        expect(optionsMenu).toBeVisible();

        expect(optionsMenu).toHaveTextContent("Size");
        
        const sizeDropdown = screen.getByText("Size");

        fireEvent.click(sizeDropdown);

        const sizeOption23 = screen.getByText("23");

        expect(sizeOption23).toBeInTheDocument();

        fireEvent.click(sizeOption23);

        const computedStyle = window.getComputedStyle(textArea);

        const fontSize = computedStyle.fontSize;

        expect(fontSize).toBe('23px');




    });
});
