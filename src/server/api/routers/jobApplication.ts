import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { jobApplications } from "~/server/db/schema";

export const jobApplicationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { title } = input;
      await ctx.db.insert(jobApplications).values({
        title,
        createdById: ctx.session.user.id,
      });
    }),
});
