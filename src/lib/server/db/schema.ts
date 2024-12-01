import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid("id").defaultRandom().primaryKey(),
	email: text("email"),
	googleId: text("google_id"),
	name: text("name"),
	image: text("image"),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
