import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const jobApplicationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ company: z.string() }))
    .mutation(({ input, ctx }) => {
      const { prisma, session } = ctx;
      const { company } = input;
      const userId = session.user.id;
      prisma.jobApplication.create({
        data: {
          company,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
