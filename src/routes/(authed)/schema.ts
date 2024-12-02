import { z } from "zod";

export const createApplicationSchema = z.object({
	title: z.string().min(2).max(32),
	company: z.string().min(2).max(32),
	status: z.enum(["Applied", "Rejected", "Accepted"]).optional(),
	appliedDate: z.string().optional(),
});

export type CreateApplicationSchema = typeof createApplicationSchema;
