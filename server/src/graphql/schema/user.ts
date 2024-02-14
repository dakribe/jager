import { builder } from "../../graphql/builder";
import { db } from "../../graphql/db";
import { Argon2id } from "oslo/password";
import { lucia } from "../../auth/lucia";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    username: t.exposeString("username"),
    hashedPassword: t.exposeString("hashedPassword"),
  }),
});

const RegisterInput = builder.inputType("registerInput", {
  fields: (t) => ({
    username: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: (root, _, ctx) => {
        const id = ctx.userId;
        return `Hello ${id}`;
      },
    }),
  }),
});

builder.queryField("me", (t) =>
  t.prismaField({
    type: "User",
    resolve: async (root, _, input, ctx) => {
      const userId = ctx.userId;
      if (!userId) {
        throw new Error("User not authenticated");
      }
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  }),
);

builder.mutationField("registerUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      input: t.arg({ type: RegisterInput, required: true }),
    },
    nullable: true,
    resolve: async (query, _, { input }, ctx) => {
      const { username, password } = input;
      // TODO: Check if username already exists
      const hashedPassword = await new Argon2id().hash(password);

      const user = await db.user.create({
        data: {
          username,
          hashedPassword,
        },
      });

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      ctx.reply.setCookie(sessionCookie.name, sessionCookie.value);

      return {
        username: user.username,
        id: user.id,
        hashedPassword,
      };
    },
  }),
);
