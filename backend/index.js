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
    const { question, style } = req.body;

    const tweetStyle = style;

    // Get the model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send prompt
    const prompt = `
    You are an AI tweet generator. 
    Write exactly ONE short tweet in the style: ${tweetStyle}. 
    UserPrompt: "${question}"
    ⚠️ Rules:
    - Only output one tweet (no options, no numbering).
    - Do not include hashtags.
    - most important rule write the tweet according to the tweet style always 
    `;

    const result = await model.generateContent(prompt);

    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

app.listen(3002, () => {
  console.log("🚀 Server is running on http://localhost:3002");
});
