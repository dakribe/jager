import {
	date,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

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

export const statusEnum = pgEnum("status", ["Applied", "Rejected", "Accepted"]);

export const jobApplication = pgTable("job_application", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id),
	title: varchar("title", { length: 255 }).notNull(),
	company: varchar("company", { length: 255 }).notNull(),
	status: statusEnum("status"),
	appliedDate: date("applied_date"),
	notes: text("notes"),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
