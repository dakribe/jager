import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const jobAppicationRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				title: z.string(),
				company: z.string(),
				appliedDate: z.date(),
				status: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { title, company, appliedDate, status } = input;
			await ctx.db.jobApplication.create({
				data: {
					title,
					company,
					appliedDate,
					status,
					userId: ctx.session.user.id,
				},
			});
		}),
	delete: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id } = input;
			await ctx.db.jobApplication.delete({
				where: {
					id,
				},
			});
		}),
	getAll: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			const { userId } = input;
			await ctx.db.jobApplication.findMany({
				where: {
					userId,
				},
			});
		}),
});
