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
    const { question } = req.body;

    // Get the model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    // You can also use "gemini-1.5-pro" if you need better quality

    // Send prompt
    const result = await model.generateContent(question);

    // Return answer
    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
