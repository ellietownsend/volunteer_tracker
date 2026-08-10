import express from "express";
import { google } from "googleapis";
import supabase from "./supabase-client.js";
import crypto from "crypto";


async function storeTokenInDatabase(uuid, refreshToken){
    const { data, error } = await supabase
        .from("tokens")
        .insert({
                uid: uuid,
                refresh_token: refreshToken,
            });

    if (error) {
        console.error("Error storing token in database:", error.message);
        return {success: false, error: error.message};
    }
    return {success: true, error: null};
}

const stateStore = new Map();


const router = express.Router();

const refreshTokenExists = false;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.get("/auth/google/status", (req, res) => {
  res.json({
    connected: !!refreshTokenExists
  });
});


router.get("/auth/google", (req, res) => {
  const userID = req.query.state;
  const state = crypto.randomBytes(32).toString("hex");
  stateStore.set(state, userID);
  
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.compose",
    ],
    state,
  });

  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).send("Missing code");
    }
    if (!state || !stateStore.has(state)) {
      return res.status(400).send("Invalid state parameter");
    } 

    const { tokens } = await oauth2Client.getToken(code);
    
    storeTokenInDatabase(stateStore.get(state), tokens.refresh_token);

     stateStore.delete(state);
    
    res.redirect("http://localhost:5173/dashboard");
  

  });

export default router;