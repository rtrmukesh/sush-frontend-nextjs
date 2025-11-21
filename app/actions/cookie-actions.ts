"use server";

import { cookies } from "next/headers";

// SET COOKIE
export async function setSessionToken(token: string) {
  (await cookies()).set("session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true };
}

// GET COOKIE
export async function getSessionToken() {
  const token = (await cookies()).get("session_token")?.value || null;
  return { token };
}

// DELETE COOKIE
export async function deleteSessionToken() {
  (await cookies()).delete("session_token");
  return { success: true };
}
