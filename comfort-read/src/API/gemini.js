const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCkUEKorCzJzYhF1g_K5zBVFcgkucnUoMo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); //model

//funct. to summarize text 
const summarizeText = async (text) => {
  try {

    const result = await model.generateContent(text);
    //extract
    return result.response.text; //use correct field based on API response 
  } catch (error) {
    console.error("Error with Google Gemini API:", error);
    throw error; //error handling
  }
};
module.exports = { summarizeText };//export summarize function

