import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const jobApplicationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ company: z.string(), appliedDate: z.date() }))
    .mutation(({ input, ctx }) => {
      const { prisma, session } = ctx;
      const { company, appliedDate } = input;
      const userId = session.user.id;
      return prisma.jobApplication.create({
        data: {
          company: company,
          applied: appliedDate,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  getAll: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      const { prisma } = ctx;
      return prisma.jobApplication.findMany({
        where: { authorId: input.userId },
      });
    }),
  deleteApplication: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      const { prisma } = ctx;
      return prisma.jobApplication.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
