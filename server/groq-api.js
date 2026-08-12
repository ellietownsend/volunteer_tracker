import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { emailSchema } from "./schema.js";
import {
  organizationMission,
  organizationName,
} from "../shared/utils/lib.js";

dotenv.config();

const router = express.Router();

const client = new Groq({
  apiKey: process.env.AI_KEY,
});


const fewShotPrompt = [
  {
    role: "assistant",
    content: JSON.stringify({
      emails: [
        {
          to: "olivia.williams@example.com",
          subject: "We Miss Your Impact",
          greeting: "Dear Olivia,",
          body: "Thank you for the 18 hours you dedicated to supporting our outreach programs. Your commitment helped advance our mission of making STEM education inclusive and accessible to every student. We would be delighted to welcome you back and hope you will consider volunteering with us again.",
          closing: "Best regards,\nGWM"
        }
      ]
    })
  },
  {
    role: "assistant",
    content: JSON.stringify({
      emails: [
        {
          to: "cat.johnson@example.com",
          subject: "Thank You for Volunteering",
          greeting: "Dear Cat,",
          body: "Thank you for dedicating 21 hours to geometry tutoring and supporting our students. Your guidance directly contributes to our mission of making STEM education accessible and empowering learners to build confidence. We would love to have you return and continue making an impact with our organization.",
          closing: "Best wishes,\nGWM"
        }
      ]
    })
  },
  {
    role: "assistant",
    content: JSON.stringify({
      emails: [
        {
          to: "james.lee@example.com",
          subject: "Your Impact Matters",
          greeting: "Hello James,",
          body: "We truly appreciate the time and energy you contributed as a volunteer. Your dedication helped us further our mission of creating inclusive and accessible opportunities for students interested in STEM. We hope you will consider returning and continuing the meaningful work you started with us.",
          closing: "Warm regards,\nGWM"
        }
      ]
    })
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

/**
 * @route POST /generateEmails
 * @summary Use chat completions to create an email for each inactive volunteer
 * @param {Object} req - Request contains uuid such that we know who started the auth flow
 * @param {Object} res - An object contaiting success, and the generated emails
 * @return {Object} 500 - API error fail to generate emails
 */
router.post("/generateEmails", async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        ...messages,
        ...fewShotPrompt,
        {
          role: "user",
          content: JSON.stringify(req.body),
        },
      ],
      response_format: emailSchema,
    });

    const emails = JSON.parse(
      response.choices[0].message.content
    );
    
    res.json({
      status: "success",
      data: emails,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to generate email.",
    });
  }
});

export default router;