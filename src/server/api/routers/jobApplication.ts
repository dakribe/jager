import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const jobApplicationRouter = createTRPCRouter({
	create: protectedProcedure
		.input(z.object({ title: z.string(), company: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { title, company } = input;
			await db.jobApplication.create({
				data: {
					company,
					title,
					userId: ctx.session.user.id,
				},
			});
		}),
	getAll: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ input }) => {
			const { userId } = input;
			await db.jobApplication.findMany({
				where: {
					userId,
				},
			});
		}),
});
