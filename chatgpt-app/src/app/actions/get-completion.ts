"use server";

import OpeAi from "openai";

const openai = new OpeAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletion(
  messageHistory: {
    role: "user" | "assistant";
    content: string;
  }[]
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messageHistory,
  });

  const messages = [
    ...messageHistory,
    response.choices[0].message as unknown as {
      role: "user" | "assistant";
      content: string;
    },
  ];

  return messages;
}
