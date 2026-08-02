export const emailSchema = {
  type: "json_schema",
  json_schema: {
    name: "email",
    strict: true,
    schema: {
      type: "object",
      properties: {
        emails: {
          type: "array",
          items: {
            type: "object",
            properties: {
              email: {
                type: "string"
              },
              subject: {
                type: "string"
              },
              greeting: {
                type: "string"
              },
              body: {
                type: "string"
              },
              closing: {
                type: "string"
              }
            },
            required: [
              "email",
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