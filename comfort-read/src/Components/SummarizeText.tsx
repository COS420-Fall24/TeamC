import {useSummarize} from "../Context/SummarizeContext"

function SummarizeText() {
  const {inputText, setInputText,summary,error,loading,handleSummarize}=useSummarize();


  return (
    <div style={{ padding: "20px" }}>
      <h2>Summarize your text</h2>
      <textarea
        value={inputText}
        onChange={(e)=>setInputText(e.target.value)}
        placeholder="Enter text to summarize..."
        style={{
          width: "100%",
          height: "150px",
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button onClick={handleSummarize} disabled={loading} style={{ marginBottom: "20px" }}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {summary && (
        <div style={{ backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "5px" }}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default SummarizeText;