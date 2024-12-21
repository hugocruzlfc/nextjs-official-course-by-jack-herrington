"use client";

import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { getCompletion } from "@/actions/get-completion";
import { useRouter } from "next/navigation";
import Transcript from "./Transcript";
import { useChat } from "ai/react";
import { updateChat } from "@/actions/update-chat";
import type { Message as AIMessage } from "ai";

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
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: initialMessages as unknown as AIMessage[],
    });
  // const [messages, setMessages] = useState<Message[]>(initialMessages);
  // const [message, setMessage] = useState("");
  const chatId = useRef<number | null>(id);

  // const handleOnClick = async () => {
  //   const completions = await getCompletion(chatId.current, [
  //     ...messages,
  //     { role: "user", content: message },
  //   ]);
  //   if (!chatId.current) {
  //     router.push(`/chats/${completions.id}`);
  //     router.refresh();
  //   }
  //   chatId.current = completions.id;
  //   setMessage("");
  //   setMessages(completions.messages);
  // };

  useEffect(() => {
    (async () => {
      if (!isLoading && messages.length) {
        const simplifiedMessages = messages.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        }));
        const newChatId = await updateChat(chatId.current, simplifiedMessages);
        if (chatId.current === null) {
          router.push(`/chats/${newChatId}`);
          router.refresh();
        } else {
          chatId.current = newChatId;
        }
      }
    })();
  }, [isLoading, messages, router]);

  return (
    <>
      <div className="flex flex-col w-full">
        <Transcript
          messages={messages as Message[]}
          truncate={false}
        />
      </div>
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3 ">
        {/* <Input
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
        </Button> */}

        <form
          className="flex mt-3 w-full"
          onSubmit={handleSubmit}
        >
          <Input
            className="flex-grow text-xl"
            placeholder="Question"
            value={input}
            onChange={handleInputChange}
            autoFocus
          />
          <Button
            type="submit"
            className="ml-3 text-xl"
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
}
