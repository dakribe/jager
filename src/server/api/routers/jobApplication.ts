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
		.mutation(({ ctx, input }) => {
			const { db, session } = ctx;
			const { company, jobTitle, status, dateApplied, location } = input;
			return db.jobApplication.create({
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
	getLastestApplications: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const { db } = ctx;
			return await db.jobApplication.findMany({
				where: {
					id: input.id,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: 5,
			});
		}),
	getCalendarData: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const { db } = ctx;
			const result = await db.jobApplication.groupBy({
				by: ["createdAt"],
				_count: {
					id: true,
				},
			});

			const formattedResult = result.map((item) => ({
				value: item._count.id,
				day: item.createdAt.toISOString().split("T")[0]!, // format date as YYYY-MM-DD
			}));

			return formattedResult;
		}),
	getApplicationStats: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const { db } = ctx;
			return await db.jobApplication.count({
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
