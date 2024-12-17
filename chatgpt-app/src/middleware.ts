import { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/chats/:chatid*"],
};

export default middleware((req, res) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
});
