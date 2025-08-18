import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Initialize Gemini client
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/ask", async (req, res) => {
  try {
    const { question,style } = req.body;


    const tweetStyle = style || "humourous,sarcastic,funny";
    // Get the model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    // You can also use "gemini-1.5-pro" if you need better quality

    // Send prompt
    const prompt =    `you are a Ai tweet Generator always write in the style ${tweetStyle}. keep it short  userPrompt is the prompt you have to customize according to the tweet style ${question}`
    const result = await model.generateContent(prompt);

    // Return answer
    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

app.listen(3002, () => {
  console.log("🚀 Server is running on http://localhost:3002");
});
