import { createCookieSessionStorage } from "@remix-run/node";

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_auth",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.ENCRYPTION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = authSessionStorage;
