import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { Router } from 'react-router';


describe("Elements are visible on home page", () => {
    test("The sidebar element is visible", () => {
        render(<App/>);
        const d = screen.getByTestId("sidebar");
        expect(d).toBeInTheDocument()
    });
    test("nefarious test", () => {
        expect(false).toBeFalsy()
    });
    test("The login link redirects to login page", () => {
        render(<App/>);
        const d = screen.getByText("Login");
        expect(d).toBeInTheDocument();
        fireEvent.click(d);
        expect(window.location.href).toBe("http://localhost/#/login");
    });
    test("The dark mode button enables dark mode", () => {
        render(<App />);
        const d = screen.getByText("Toggle Dark Mode");
        expect(d).toBeInTheDocument();
        fireEvent.click(d);
        expect(screen.getByTestId("App")).toHaveClass("dark");
    });
});
