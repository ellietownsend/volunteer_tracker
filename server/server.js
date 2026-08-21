import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import groqRoutes from "./groq-api.js";
import googleRoutes from "./google-api.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/api", groqRoutes);
app.use("/api", googleRoutes);

const PORT = process.env.PORT || 3001;


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
