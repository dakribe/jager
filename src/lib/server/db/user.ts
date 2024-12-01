import { eq } from "drizzle-orm";
import { db } from ".";
import { user, type User } from "./schema";

export type CreateUser = typeof user.$inferInsert;

export async function createUser(params: CreateUser) {
	const [newUser] = await db.insert(user).values(params).returning();
	return newUser;
}

export async function getUserFromGoogleId(
	googleId: string,
): Promise<User | null> {
	const [foundUser] = await db
		.select()
		.from(user)
		.where(eq(user.googleId, googleId));

	if (!foundUser) {
		return null;
	}

	return foundUser;
}
