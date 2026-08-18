import express from "express";
import { google } from "googleapis";
import supabase from "./supabase-client.js";
import crypto from "crypto";


const stateStore = new Map();

const router = express.Router();


function createOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

const oauth2Client = createOAuth2Client();

/**
 * Stores the refreshToken token received by Auth API such that users do not have to re-log in when original token expires.
 * 
 * @param {string} uuid - The unique id of the user signed in.
 * @param {string} minimumAge - The refresh token.
 * @returns {success, error} True if able to insert token in supabase table.
 */
async function storeTokenInDatabase(uuid, refreshToken){
    const { data, error } = await supabase
        .from("tokens")
        .insert({
                uid: uuid,
                refresh_token: refreshToken,
            });

    if (error) {
        return {success: false, error: error.message};
    }
    return {success: true, error: null};
}

/**
 * Checks if a user is already authenticted by searching database for token associated with uuid.
 * 
 * @param {uuid} uuid - The unique id of the user signed in.
 * @returns {found, error} found if refresh token was found by database
 */
async function refreshTokenExists(uuid) {
    const { data, error } = await supabase
      .from("tokens")
      .select("refresh_token")
      .eq("uid", uuid)
      .maybeSingle();

    if (error) {
      return {
        found: false,
        error: error.message,
      };
    }

    if (!data?.refresh_token) {
      return {
        found: false,
        error: "No refresh token found",
      };
    }

    return {
      found: true,
      error: null,
    };
}

/**
 * Retreives refresh token using the uuid of user 
 * 
 * @param {uuid} uuid - The unique id of the user signed in.
 * @returns {refresh_token} returns the authenticed users refresh_token
 */
async function getRefreshToken(uuid) {
  const { data, error } = await supabase
    .from("tokens")
    .select("refresh_token")
    .eq("uid", uuid)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to retrieve Google token: ${error.message}`);
  }

  if (!data?.refresh_token) {
    throw new Error("No Google refresh token found for this user.");
  }
  return data.refresh_token;
}


/**
 * Creates an authenticated Gmail API client for a user.
 *
 * Retrieves the user's refresh token using their UUID and uses it
 * to authenticate the Gmail API client.
 *
 * @param {string} uuid - The unique ID of the user.
 * @returns {object} An authenticated Gmail API client.
 */
export async function getGmailClient(uuid) {
  const refreshToken = await getRefreshToken(uuid);

  const auth = createOAuth2Client();

  auth.setCredentials({
    refresh_token: refreshToken,
  });

  return google.gmail({
    version: "v1",
    auth,
  });
}

/**
 * Loads raw string into binary buffer and converts it into a URL-safe Base64 encoded string
 *
 * Necessary to format emails for the Gmail API
 *
 * @param {string} rawMime - Raw input string.
 * @returns {string} Base64 encoded string
 */
function encodeMessage(rawMime) {
  return Buffer.from(rawMime).toString("base64url");
}

/**
 * Loads raw string into binary buffer and converts it into a URL-safe Base64 encoded string
 *
 * Necessary to format emails for the Gmail API
 *
 * @param {string} to - email address of volunteer
 * @param {string} subject - email subject
 * @param {string} greeting - email greeting
 * @param {string} body - email body
 * @param {string} closing - email closing
 * @returns {string} returns parts of the email (to,subject,greeting,body,closing) into a single unified block of text
 */
function createMimeMessage({to,subject,greeting,body,closing,}) {
  const content = [
    greeting || "",
    "",
    body || "",
    "",
    closing || "",
  ].join("\r\n");

  return [
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 8bit`,
    "",
    content,
  ].join("\r\n");
}


/**
 * @route GET /auth/google/status
 * @summary Check the authentification status of the user by calling refreshTokenExists()
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {connected, error} returns connected as true if token is found 
 */
router.get("/auth/google/status", async (req, res) => {
  const uuid = req.query.uuid;

  if (!uuid) {
    return res.status(400).json({
      connected: false,
      error: "Missing uuid",
    });
  }

  const {found, error} = await refreshTokenExists(uuid);

  if (error) {
    console.error("Failed to check Google connection:", error);

  return res.status(500).json({
      connected: false,
      error: "Failed to check Google connection",
    });
  }

  res.json({
    connected: found,
  });
});


/**
 * @route GET /auth/google
 * @summary redirect to unauthentification user to google auth
 * @param {Object} req - Request contains uuid such that we know who started the auth flow
 * @param {url} res - Redirect to the url created with user credentials and necessary permissions
 */
router.get("/auth/google", (req, res) => {
  const uuid = req.query.uuid;
  const state = crypto.randomBytes(32).toString("hex");
  stateStore.set(state, uuid);
  
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


/**
 * @route GET /auth/google/callback
 * @summary After authentifcation, this endpoint it used to verify the request was not modified before returning to the dashboard
 * @param {Object} req - Express request object
 * @param {Object} res - Redirection to the dashboard, now signed in
 * @returns {Error}  400 - Invalid state parameter (request has been modified by someone other than the user)
 * @returns {Error}  400 - API did not provide a valid code
 * @returns {Error} 500 - failed to store token in Supabase
 * @returns {Error} 500 - API authentication failed
 */
router.get("/auth/google/callback", async (req, res) => {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).send("Missing code");
    }
    if (!state || !stateStore.has(state)) {
      return res.status(400).send("Invalid state parameter");
    } 
    try{
      const { tokens } = await oauth2Client.getToken(code);
      const userID = stateStore.get(state);
      const result = await storeTokenInDatabase(stateStore.get(state), tokens.refresh_token);
      if (!result.success) {
        console.error("Failed to save refresh token:", result.error);
        return res.status(500).send("Unable to save Google credentials");
      }
      res.redirect(`${process.env.CLIENT_URL}/dashboard`);


     }catch(error){
      console.error("Error occurred while fetching tokens:", error.message);
      return res.status(500).send("Google authentication failed");
     }

     stateStore.delete(state);
  });

  /**
 * @route POST /draftemails
 * @summary  Create a seperate email draft for each inactive volunteer
 * @param {Object} req - Express request object
 * @param {Object} res - Redirection to the dashboard, now signed in
 * @returns {Error}  400 -  UUID is required to generate drafts
 * @returns {Error}  400 - AI generated are necessary, without email drafts will not be made 
 * @returns {Error} 500 - failed to draft emails, google api error
 * @returns {status, summary results} - status of the emails
 */
  router.post("/draftemails", async (req, res) => {
  try {
    const { uuid, generatedEmails } = req.body;

    if (!uuid) {
      return res.status(400).json({
        error: "Missing uuid",
      });
    }

    if (!Array.isArray(generatedEmails) || generatedEmails.length === 0) {
      return res.status(400).json({
        error: "No emails provided",
      });
    }

    const gmail = await getGmailClient(uuid);
    const results = [];

    for(const email of generatedEmails){
      try {
        const {to, subject, greeting, body, closing} = email;

        if (!to || !subject || !body) {
          results.push({
            to,
            success: false,
            error: "Missing to, subject, or body",
          });
          continue;
        }

         const rawMessage = createMimeMessage({
          to,
          subject,
          greeting,
          body,
          closing,
        });

        const response = await gmail.users.drafts.create({
          userId: "me",
          requestBody: {
            message: {
              raw: encodeMessage(rawMessage),
            },
          }
        });

        results.push({
          to,
          success: true,
          draftId: response.data.id,
        });
      } catch (error) {
        console.error(`Failed to draft email to ${email.to}:`, error);

        results.push({
          to: email.to,
          success: false,
          error: error.message,
        });

      }
    }
    const successful = results.filter(
      (result) => result.success
    ).length;

    const failed = results.filter(
      (result) => !result.success
    ).length;

    return res.json({
      status: "success",
      summary: {
        total: results.length,
        successful,
        failed,
      },
      results,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message || "Failed to draft emails.",
    });
  }
});

export default router;