import React from "react";
import { useContext } from "react";
import {render, screen,fireEvent } from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import{DarkModeContext} from "../Context/DarkModeContext";
import { FocusModeContext , FocusProvider} from "../Context/FocusModeContext";
import Sidebar from "./Sidebar";
import { isFocusable } from "@testing-library/user-event/dist/utils";

jest.mock("./SidebarData", () => ({ //mock sidebar w/ items
  SidebarData:[
    { name: "Home", url: "/" },
    { name: "Login", url: "/login" },
    { name: "Presets" },
    { name: "Color" },
    { name: "Format" },
    { name: "Extra" },
    { name: "Import/Export" },
    { name: "Summarize" },
  ],
}));
describe("sidebar component", () => {//make sure everyhting renders
  test("render sidebar list", () => {
    render(
      <FocusModeContext.Provider value={{ toggleFocusMode: jest.fn() }}>
        <DarkModeContext.Provider value={{ toggleDarkMode: jest.fn() }}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </DarkModeContext.Provider>
      </FocusModeContext.Provider>
    ); //sidebar list
    const items = ["Home", "Login", "Presets", "Color", "Format", "Extra", "Import/Export", "Summarize"];
    items.forEach((item) => { //loop to check if present ^
    expect(screen.getByText(item)).toBeInTheDocument(); //each line visible in sidebar
    });
  });
  test("call toggleDarkMode when dark mode toggle clicked", () => { //test for darkmode toggel functionality
    const mockToggleDarkMode = jest.fn(); //mmock darkmode fun.
    render(
      <FocusModeContext.Provider value={{ toggleFocusMode: jest.fn() }}>
        <DarkModeContext.Provider value={{ toggleDarkMode: mockToggleDarkMode }}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </DarkModeContext.Provider>
      </FocusModeContext.Provider>
    );
    const toggleButton = screen.getByText("Toggle Dark Mode");
    fireEvent.click(toggleButton); //sim
    expect(mockToggleDarkMode).toHaveBeenCalled(); //mock fun. call
  });
  test("initial focus mode is false and there's a toggle", () => { //test for focus mode toggle
    const mockToggleFocusMode = jest.fn();
    render(
      <FocusModeContext.Provider value={{ toggleFocusMode: mockToggleFocusMode }}>
        <DarkModeContext.Provider value={{ toggleDarkMode: jest.fn() }}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </DarkModeContext.Provider>
      </FocusModeContext.Provider>
    );
    const toggleOn = screen.getByText("Hide All");
    fireEvent.click(toggleOn); //sim
    expect(mockToggleFocusMode).toHaveBeenCalled(); //mock fun. call
  });
  test("The Hide All button toggles focus mode", async () => { //THIS ONE TOOK FOREVER
    let focusMode = false;
    const mockToggleFocusMode = jest.fn(() => {
        focusMode = !focusMode;
    });
  
    render(
      <FocusModeContext.Provider value={{ toggleFocusMode: mockToggleFocusMode }}>
        <DarkModeContext.Provider value={{ isDarkMode: false, toggleDarkMode: jest.fn() }}>
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        </DarkModeContext.Provider>
      </FocusModeContext.Provider>
    );

    //Check if after clicking on Hide All, it toggles focus mode
    const initialButton = screen.getByText("Hide All");
    expect(initialButton).toBeInTheDocument();
    expect(focusMode).toBe(false);
    fireEvent.click(initialButton);
    expect(mockToggleFocusMode).toHaveBeenCalled();
    expect(focusMode).toBe(true);
  });
  test("Focus Mode is initially false and shows all elements", async () => {   
    render(
      <FocusModeContext.Provider value={{ toggleFocusMode: jest.fn() }}>
        <DarkModeContext.Provider value={{ isDarkMode: false, toggleDarkMode: jest.fn() }}>
          <MemoryRouter>
            <Sidebar />
          </MemoryRouter>
        </DarkModeContext.Provider>
      </FocusModeContext.Provider>
    );
    const sidebarID = screen.getByTestId('sidebar');
    if (sidebarID.textContent) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(sidebarID.textContent.substring(0, 8)).toBe('Hide All');
  } else {
      throw new Error('sidebarID does not exist or does not contain any text');
  }
    const items = ["Home", "Login", "Presets", "Color", "Format", "Extra", "Import/Export", "Summarize"];
    items.forEach((item) => { //loop to check if present ^
      expect(screen.getByText(item)).toBeInTheDocument(); //each line visible in sidebar
    });    

  });
});