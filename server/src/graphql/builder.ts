import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "../../prisma/generated";
import { db } from "./db";
import { FastifyReply, FastifyRequest } from "fastify";

export interface GrapQLContext {
  req: FastifyRequest;
  reply: FastifyReply;
  userId: string;
}

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: GrapQLContext;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});
