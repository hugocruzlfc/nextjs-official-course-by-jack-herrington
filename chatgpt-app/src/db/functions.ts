import { sql } from "./config";
import type { Chat, Message, ChatWithMessages } from "../types";

export async function getChat(
  chatId: number
): Promise<ChatWithMessages | null> {
  const { rows: chats } = await sql.query(`SELECT * FROM chats WHERE id = $1`, [
    chatId,
  ]);

  if (!chats[0]) {
    return null;
  }
  const { rows: messages } = await sql.query(
    `SELECT * FROM messages WHERE chat_id = $1`,
    [chatId]
  );

  return {
    ...chats[0],
    messages: messages.map((msg) => ({
      ...msg,
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
  } as ChatWithMessages;
}

export async function getChats(userEmail: string): Promise<Chat[]> {
  const { rows: chats } = await sql.query(
    `SELECT * FROM chats WHERE user_email = $1`,
    [userEmail]
  );
  return chats as Chat[];
}

export async function createChat(
  userEmail: string,
  name: string,
  msgs: Message[]
) {
  try {
    await sql.query(`INSERT INTO chats (user_email, name) VALUES ($1, $2)`, [
      userEmail,
      name,
    ]);

    const { rows: lastInsertId } = await sql.query(
      `SELECT currval(pg_get_serial_sequence('chats','id')) AS currval;`
    );

    const chatId = lastInsertId[0].currval;

    for (const msg of msgs) {
      await sql.query(
        `INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3)`,
        [chatId, msg.role, msg.content]
      );
    }

    return chatId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getChatsWithMessages(
  userEmail: string
): Promise<ChatWithMessages[]> {
  const { rows: chatsWithMessages } = await sql.query(
    `SELECT chats.*, messages.*
     FROM chats
     LEFT JOIN messages ON chats.id = messages.chat_id
     WHERE chats.user_email = $1
     ORDER BY chats.created_at DESC
     LIMIT 3`,
    [userEmail]
  );

  return chatsWithMessages as ChatWithMessages[];
}

export async function getMessages(chatId: number) {
  const { rows: messages } = await sql.query(
    `SELECT * FROM messages WHERE chat_id = $1`,
    [chatId]
  );

  return messages.map((msg) => ({
    ...msg,
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));
}

export async function updateChat(chatId: number, msgs: Message[]) {
  await sql.query(`DELETE FROM messages WHERE chat_id = $1`, [chatId]);

  for (const msg of msgs) {
    await sql.query(
      `INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3)`,
      [chatId, msg.role, msg.content]
    );
  }
}
