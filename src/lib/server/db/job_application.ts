import { eq } from "drizzle-orm";
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

export async function getJobApplications(userId: string) {
	const applications = await db
		.select()
		.from(jobApplication)
		.where(eq(jobApplication.userId, userId));

	return applications;
}
