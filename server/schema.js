export const emailSchema = {
  type: "json_schema",
  json_schema: {
    name: "generated_emails",
    strict: true,
    schema: {
      type: "object",
      properties: {
        emails: {
          type: "array",
          items: {
            type: "object",
            properties: {
              to: {
                type: "string",
                description: "The volunteer's email address."
              },
              subject: {
                type: "string",
                description: "A professional email subject containing fewer than 7 words."
              },
              greeting: {
                type: "string",
                description: "A polite greeting addressing the volunteer by name."
              },
              body: {
                type: "string",
                description: "Exactly 3 sentences. Thank the volunteer, mention the organization's mission, and encourage them to return."
              },
              closing: {
                type: "string",
                description: "A polite professional sign-off."
              }
            },
            required: [
              "to",
              "subject",
              "greeting",
              "body",
              "closing"
            ],
            additionalProperties: false
          }
        }
      },
      required: ["emails"],
      additionalProperties: false
    }
  }
};