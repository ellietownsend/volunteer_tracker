import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const client = new Groq({
  apiKey: process.env.AI_KEY,
});

let messages = [
    {
        role: "system",
        /* NEED TO WRITE */
        content: `NEED TO WRITE`
    },
]

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.post("/api/createmessage", async (req, res) => {
  const { volunteerName } = req.body;
  messages.push({ role: "user", content: volunteerName });

  const response = await client.chat.completions.create({
    model: process.env.AI_MODEL,
    messages,
  })

  const message = JSON.parse(response.choices[0].message.content);

  res.json(message);
  });

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
