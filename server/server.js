import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import groqRoutes from "./groq-api.js";
import googleRoutes from "./google-api.js";

dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://volunteer-tracker-client-sdwz.onrender.com",
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// if serving the React build from Express
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", groqRoutes);
app.use("/api", googleRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
