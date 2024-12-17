export interface Chat {
  id: number;
  user_email: string;
  name: string;
  created_at: Date;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface StoredMessage extends Message {
  id: number;
  chat_id: string;
}

export interface ChatWithMessages extends Chat {
  messages: StoredMessage[];
}
