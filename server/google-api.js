import express from "express";
import { google } from "googleapis";
import supabase from "./supabase-client.js";

export async function storeTokenInDatabase(uuid, refreshToken){
    const { data, error } = await supabase
        .from("tokens")
        .insert({
                uid: "",
                refresh_token: refreshToken,
            });

    if (error) {
        console.error("Error storing token in database:", error.message);
        return {success: false, error: error.message};
    }
    return {success: true, error: null};
}

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
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log(tokens);
    
    // Save refresh token to database
    

    res.redirect("http://localhost:5173/dashboard");

  });

export default router;