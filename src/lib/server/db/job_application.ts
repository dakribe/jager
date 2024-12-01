import { db } from ".";
import { jobApplication } from "./schema";

export type InsertJobApplication = typeof jobApplication.$inferInsert;

export async function CreateJobApplication(params: InsertJobApplication) {
	const [application] = await db
		.insert(jobApplication)
		.values(params)
		.returning();
	return application;
}
