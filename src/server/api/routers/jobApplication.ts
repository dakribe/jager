import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const jobApplicationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        companyName: z.string(),
        jobTitle: z.string(),
        appliedDate: z.date(),
        status: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const { prisma, session } = ctx;
      const { companyName, jobTitle, appliedDate, status } = input;
      const userId = session.user.id;
      return prisma.jobApplication.create({
        data: {
          company_name: companyName,
          job_title: jobTitle,
          applied_date: appliedDate,
          status: status,
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
      const { userId } = input;
      return prisma.jobApplication.findMany({
        where: {
          authorId: userId,
        },
      });
    }),
  getLatest: protectedProcedure
    .input(z.object({ amount: z.number() }))
    .query(({ input, ctx }) => {
      const { prisma } = ctx;
      const { amount } = input;
      return prisma.jobApplication.findMany({
        orderBy: { created_at: "desc" },
        take: amount,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input, ctx }) => {
      const { prisma } = ctx;
      const { id } = input;
      return prisma.jobApplication.delete({
        where: {
          id: id,
        },
      });
    }),
});
