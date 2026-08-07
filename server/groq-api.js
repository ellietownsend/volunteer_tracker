import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
console.log("AI_KEY:", process.env.AI_KEY);

import { emailSchema } from "./schema.js";
import {
  organizationMission,
  organizationName,
} from "../shared/utils/lib.js";

const router = express.Router();

const client = new Groq({
  apiKey: process.env.AI_KEY,
});

const fewShotPrompt = [
  {
    role: "assistant",
    content: `emails: [{
      email: 'olivia.williams@example.com',
      subject: 'We Miss Your Impact',
      greeting: 'Dear Olivia,',
      body: 'Thank you for your dedication as an Outreach volunteer supporting Chemistry initiatives. Your 18 hours of outreach have inspired many students to explore STEM and break barriers. We would love for you to rejoin us in advancing Girls Who Math’s mission of inclusive, accessible science education.',
      closing: 'Best regards, GWM'
    }]`
  },
  {
    role: "assistant",
    content: `emails: [{
      email: 'olivia.williams@example.com',
      subject: 'Thank you for your dedication',
      greeting: 'Dear Cat,',
      body: 'Thank you for dedicating 21 hours of geometry tutoring to our students. Your guidance has helped countless learners build confidence in STEM. Our mission to make STEM accessible would not be possible without your effort.',
      closing: 'Best wishes, GWM'
    }]`
  }
];

const messages = [
  {
    role: "system",
    content: `
You are ${organizationName}'s personal assistant.

Write thoughtful, formal, professional emails to inactive volunteers.

Each email must contain:
- volunteer email
- subject under 7 words
- greeting
- 3 sentence body
- mention ${organizationMission}
- encourage returning
- polite sign-off
`
  }
];

router.post("/createmail", async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        ...messages,
        ...fewShotPrompt,
        {
          role: "user",
          content: JSON.stringify(req.body)
        }
      ],
      response_format: emailSchema
    });

    const email = JSON.parse(response.choices[0].message.content);

    res.json({
      status: "success",
      data: email
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate email." });
  }
});

export default router;