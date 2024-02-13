import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema";

const app = fastify({ logger: true });

const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
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
    response.headers.forEach((value, key) => {
      reply.header(key, value);
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
