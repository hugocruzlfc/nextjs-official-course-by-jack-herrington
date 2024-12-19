"use client";

import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { getCompletion } from "@/actions/get-completion";
import { useRouter } from "next/navigation";
import Transcript from "./Transcript";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat({
  id = null,
  messages: initialMessages = [],
}: {
  id?: number | null;
  messages?: Message[];
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");
  const chatId = useRef<number | null>(id);

  const handleOnClick = async () => {
    const completions = await getCompletion(chatId.current, [
      ...messages,
      { role: "user", content: message },
    ]);
    if (!chatId.current) {
      router.push(`/chats/${completions.id}`);
      router.refresh();
    }
    chatId.current = completions.id;
    setMessage("");
    setMessages(completions.messages);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Transcript
          messages={messages}
          truncate={false}
        />
      </div>
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3 w-full">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleOnClick();
            }
          }}
        />
        <Button
          onClick={handleOnClick}
          className="ml-3 text-xl"
        >
          Send
        </Button>
      </div>
    </>
  );
}
