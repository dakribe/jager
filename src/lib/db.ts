import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { user } from '@/user/user.sql'
import { session } from '@/session/session.sql'
import { account } from '@/account/account.sql'
import { verification } from '@/verification/verification.sql'
import { application } from '@/application/application.sql'

const schema = {
  user,
  session,
  verification,
  account,
  application,
}

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client, { schema })

export { db }
