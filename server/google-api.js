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

async function refreshTokenExists(uuid){
  console.log("recieves uuid", uuid);
  const {data, error} = await supabase
    .from("tokens")
    .select("*")
    .eq("uid", uuid)
    .maybeSingle();

    if (error) {
      console.error('Error checking existence:', error);
      return false;
    } else {
      if(data == null){
        console.error('No result found:', error);
        return false;
      }
      return true;
}

  console.log(data);
  console.log(error);
  if(!data || data.length === 0){
    console.log("no refresh token found for that uuid found")
    return false;
  }
   console.log("refresh token found for that uuid found")
  return true;
}


const stateStore = new Map();


const router = express.Router();


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.get("/auth/google/status", async (req, res) => {
  const uuid = req.query.uuid;
  res.json({
    connected: !!(await refreshTokenExists(uuid)),
  });
});


router.get("/auth/google", (req, res) => {
  const uuid = req.query.uuid;
  const state = crypto.randomBytes(32).toString("hex");
  stateStore.set(state, uuid);
  console.log("state that was generated",state);
  
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
      console.log("State that was found",state);
      return res.status(400).send("Invalid state parameter");
    } 
    try{
      const { tokens } = await oauth2Client.getToken(code);
      const userID = stateStore.get(state);
      const result = await storeTokenInDatabase(stateStore.get(state), tokens.refresh_token);
      res.redirect("http://localhost:5173/dashboard");

      if (!result.success) {
        console.error("Failed to save refresh token:", result.error);
        return res.status(500).send("Unable to save Google credentials");
      }

     }catch(error){
      console.error("Error occurred while fetching tokens:", error.message);
      return res.status(500).send("Google authentication failed");
     }

     stateStore.delete(state);
  });

export default router;