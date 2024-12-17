import Chat from "@/components/Chat";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome to GPT chat</h1>
      {!session?.user?.email ? (
        <div className="flex flex-col items-center mt-5">
          <p className="text-xl font-semibold">
            You need log in to use this chat.
          </p>
        </div>
      ) : (
        <>
          <Separator className="my-5" />
          <Chat />
        </>
      )}
    </main>
  );
}
