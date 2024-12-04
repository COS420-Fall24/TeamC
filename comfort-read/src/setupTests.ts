// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

beforeAll(() => {
    global.document.execCommand = jest.fn();
    
    global.SpeechSynthesisUtterance = jest.fn();

    /* Approach 1  Right out the mock with better and better values so that when things that are mocked are called, it actually gets the correct values.*/
    /* Approach 2 Find an Open Source Library that mocks the speechSynthesis API and use that.*/
    window.speechSynthesis = {
        speak: jest.fn(),
        getVoices: jest.fn().mockReturnValue([]),
        onvoiceschanged: null,
        paused: false,
        pending: false,
        speaking: false,
        cancel: jest.fn(),
        pause: jest.fn(), 
        resume: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    } as SpeechSynthesis;

    jest.mock("./Components/SidebarData", () => ({ //mock sidebar w/ items
        SidebarData:[
          { name: "Home", url: "/" },
          { name: "Login", url: "/login" },
          { name: "Presets" },
          { name: "Color" },
          { name: "Format" },
          { name: "Extra" },
          { },
          { name: "Summarize" },
        ],
      }));
});