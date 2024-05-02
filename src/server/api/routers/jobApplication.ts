import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const jobApplicationRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				company: z.string(),
				jobTitle: z.string(),
				status: z.string(),
				location: z.string(),
				dateApplied: z.date(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { db, session } = ctx;
			const { company, jobTitle, status, dateApplied, location } = input;
			return await db.jobApplication.create({
				data: {
					company,
					jobTitle,
					status,
					dateApplied,
					location,
					user: {
						connect: {
							id: session.user.id,
						},
					},
				},
			});
		}),
	getAll: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			const { db } = ctx;
			return await db.jobApplication.findMany({
				where: {
					userId: input.userId,
				},
			});
		}),
	getApplicationById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const { db } = ctx;
			return await db.jobApplication.findUnique({
				where: {
					id: input.id,
				},
			});
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			return await db.jobApplication.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
