import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema";
import fastifyCookie from "@fastify/cookie";
import { lucia } from "./auth/lucia";

const app = fastify({
  logger: true,
});

app.register(fastifyCookie, {
  secret: "secret",
});

const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  context: async ({ req, reply }) => {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      reply.header(
        "set-cookie",
        lucia.createSessionCookie(session.id).serialize(),
      );
    }

    if (!session) {
      reply.header("set-cookie", lucia.createBlankSessionCookie().serialize());
    }
    const userId = user?.id;

    return {
      userId,
    };
  },
  schema,
  maskedErrors: false,
});

app.route({
  url: "/",
  method: "GET",
  handler: async (_, reply) => {
    return reply.code(200).send({ status: "ok" });
  },
});

app.route({
  url: "/graphql",
  method: ["GET", "POST", "OPTIONS"],
  handler: async (req, reply) => {
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply,
    });

    reply.status(response.status);

    reply.send(response.body);

    return reply;
  },
});

app.listen({
  port: 4000,
  host: "0.0.0.0",
});
