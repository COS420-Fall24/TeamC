import React, { createContext, useState, useContext } from "react";
import axios from "axios";

//context
const SummarizeContext = createContext();

//provider
export const SummarizeProvider = ({ children }) => {
  const [inputText, setInputText] = useState(""); //text input by the user
  const [summary, setSummary] = useState(""); //the generated summary
  const [loading, setLoading] = useState(false); //loading state
  const [error, setError] = useState(""); //error message if any

  
  const handleSummarize = async () => { //function to summarize text
    console.log("Summarize button clicked! Text:", inputText);
    if (!inputText.trim()) {
      setError("Please enter text to summarize.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
        console.log("Send summarize request:", inputText);
      const response = await fetch("http://localhost:3001/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText}),
      });
      if (!response.ok) {
        throw new Error("Failed to summarize text.");
      }
      const data = await response.json();
      setSummary(data.summary);
    }catch (err) {
     console.error("Error generating summary:", err);
      setError("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <SummarizeContext.Provider
      value={{
        inputText,
        setInputText,
        summary,
        handleSummarize,
        loading,
        error,
      }}
    >
      {children}
    </SummarizeContext.Provider>
  );
};

//hook to use the Summarize context
export const useSummarize = () => useContext(SummarizeContext);
