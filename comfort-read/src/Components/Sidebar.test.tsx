import React from "react";
import {render, screen,fireEvent } from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import{DarkModeContext} from "../Context/DarkModeContext";
import Sidebar from "./Sidebar";

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
        <DarkModeContext.Provider value={{ toggleDarkMode: jest.fn() }}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </DarkModeContext.Provider>
    ); //sidebar list
    const items = ["Home", "Login", "Presets", "Color", "Format", "Extra", "Import/Export", "Summarize"];
    items.forEach((item) => { //loop to check if present ^
    expect(screen.getByText(item)).toBeInTheDocument(); //each line visible in sidebar
    });
  });
  test("call toggleDarkMode when dark mode toggle clicked", () => { //test for darkmode toggel functionality
    const mockToggleDarkMode = jest.fn(); //mmock darkmode fun.
    render(
      <DarkModeContext.Provider value={{ toggleDarkMode: mockToggleDarkMode }}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </DarkModeContext.Provider> //wrap sidebar 
    );
    const toggleButton = screen.getByText("Toggle Dark Mode");
    fireEvent.click(toggleButton); //sim
    expect(mockToggleDarkMode).toHaveBeenCalled(); //mock fun. call
  });
});
