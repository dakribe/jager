import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "../../prisma/generated";
import { db } from "./db";
import { FastifyReply, FastifyRequest } from "fastify";

interface MyContext {
  req: FastifyRequest;
  reply: FastifyReply;
}

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: MyContext;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});
