import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { user } from '@/user/user.sql'

export const application = pgTable(
  'application',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    status: text('status').notNull().default('applied'),
    companyName: text('company_name').notNull(),
    jobTitle: text('job_title').notNull(),
    jobUrl: text('job_url'),
    location: text('location'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index('application_userId_idx').on(table.userId),
    index('application_status_idx').on(table.status),
  ],
)
