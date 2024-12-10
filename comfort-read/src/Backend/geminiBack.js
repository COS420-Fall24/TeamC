const express =require("express");
const cors =require("cors");
const { GoogleGenerativeAI } =require("@google/generative-ai");

const app=express();
app.use(cors());
app.use(express.json());
//innitialize
const genAI=new GoogleGenerativeAI("AIzaSyCkUEKorCzJzYhF1g_K5zBVFcgkucnUoMo");
app.post("/summarize",async(req, res) => {   //endpoint for summarize
    console.log('summarize request received',req.body.text);
  const { text }=req.body;
  if(!text || text.trim()===""){
    return res.status(400).json({error:"Text input is required."});
  }
  try {
    const model =genAI.getGenerativeModel({ model: "gemini-1.5-flash" });//get model instance
   
    const result=await model.generateContent(text);//summ.generation
    
    res.json({ summary: result.response.text });//summ. respnse
  } catch (error){
    console.error("Error with Gemini API", error);
    res.status(500).json({ error: "Failed to summarize text." });
  }
});
//boot server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

