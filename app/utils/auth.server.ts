import { TOTPStrategy } from "remix-auth-totp";
import { Authenticator } from "remix-auth";
import { authSessionStorage } from "./auth-session.server";
import type { User } from "@prisma/client";
import { db } from "./db.server";
import { sendAuthEmail } from "./email.server";

export let authenticator = new Authenticator<User>(authSessionStorage, {
  throwOnError: true,
});

authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.ENCRYPTION_SECRET,
      magicLinkGeneration: { callbackPath: "/magic-link" },

      createTOTP: async (data, expiresAt) => {
        await db.totp.create({ data: { ...data, expiresAt } });

        try {
          await db.totp.deleteMany({
            where: {
              expiresAt: {
                lt: new Date(),
              },
            },
          });
        } catch (error) {
          console.warn("Error deleting expired TOTP records", error);
        }
      },
      readTOTP: async (hash) => {
        return await db.totp.findUnique({ where: { hash } });
      },
      updateTOTP: async (hash, data, expiresAt) => {
        await db.totp.update({ where: { hash }, data });
      },
      sendTOTP: async ({ email, code, magicLink }) => {
        await sendAuthEmail({ email, code, magicLink });
      },
    },
    async ({ email }) => {
      let user = await db.user.findUnique({ where: { email } });

      if (!user) {
        user = await db.user.create({ data: { email } });
      }

      return user;
    },
  ),
);
