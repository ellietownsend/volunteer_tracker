import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { emailSchema } from "./schema.js";
import { organizationMission, organizationName } from "./src/utils/lib";
import { google } from "googleapis";
const refreshTokenExists = false; // Placeholder for actual token check logic
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

/* AI Configuration */

const client = new Groq({
  apiKey: process.env.AI_KEY,
});

/* Google OAuth2 Configuration */

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);




const fewShotPrompt = [
  {
    role: "assistant",
    content:
      `emails: [{
          email: 'olivia.williams@example.com',
          subject: 'We Miss Your Impact',
          greeting: 'Dear Olivia,',
          body: 'Thank you for your dedication as an Outreach volunteer supporting Chemistry initiatives. Your 18 hours of outreach have inspired many students to explore STEM and break barriers. We would love for you to rejoin us in advancing Girls Who Math’s mission of inclusive, accessible science education.',
          closing: 'Best regards, GWM'
        }]`
  },
  {
    role: "assistant",
    content:
    `emails: [{
          email: 'olivia.williams@example.com',
          subject: 'Thank you for your dedication',
          greeting: 'Dear Cat,',
          body: 'lThank you for dedicating 21 hours of geometry tutoring to our students. Your guidance has helped countless learners build confidence in STEM. Our mission to make STEM accessible would not be possible without your effort.',
          closing: 'Best wishes, GWM'
        }
      ]
    `

  }
]


let messages = [
    {
        role: "system",
        content: `You are ${organizationName}'s personal assistant. Your job is to write individually unique emails to 
                  inactive volunteers. 

                  These emails are thoughtful, formal, specific, and professional.

                  Each email must have:
                  - The email address of the volunteer the email is dedicated to.
                  - Clear subject line: Keep it short (under 7 words) so the reader knows the main topic right away.
                  - Greeting: Use a formal greeting like "Dear [Name]" or a friendly professional "Hi [Name]"
                  - Body: Use 3 short sentences to thank them for their role, any milestones, or subjects. Mention that ${organizationName}'s
                    work in their ${organizationMission} would not be possible without their effort.
                  - Closing: Include a sentence encouraging them to get involved again. Finish with a polite sign-off like "Best regards, GWM" or "Sincerely, GWM"
`
    },
]


/* API Endpoints */

app.post("/api/createmail", async (req, res) => {
  const userData = req.body; 

  const response = await client.chat.completions.create({
    model: process.env.AI_MODEL,
    messages: [
      ... messages,
      ...fewShotPrompt,
        {
      role: "user",
      content: JSON.stringify(userData)
    }
    ],
    response_format: emailSchema
  })

  const email = JSON.parse(response.choices[0].message.content);

  res.status(200).json({ status: 'success', data: email });
  });


 app.get("/api/auth/google/status", (req, res) => {
      res.json({
      connected: !!refreshTokenExists,
    });
});


  app.get("/auth/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    console.log(tokens);

    // TODO:
    // Save tokens.refresh_token in your database
    // Associate it with the logged-in Supabase user

    res.send("Gmail connected successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth failed");
  }
});

  app.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.compose",
    ],
  });

  res.redirect(url);
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

