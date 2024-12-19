"use server";

import OpeAi from "openai";

import { auth } from "@/auth";
import { createChat, updateChat } from "@/db/functions";

const openai = new OpeAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletion(
  id: number | null,
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

  const session = await auth();

  let chatId = id;

  if (!chatId) {
    chatId = await createChat(
      session?.user?.email!,
      messageHistory[0].content,
      messages
    );
  } else {
    await updateChat(chatId, messages);
  }

  return {
    messages,
    id: chatId,
  };
}
