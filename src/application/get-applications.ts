import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { desc, eq } from 'drizzle-orm'
import { application } from './application.sql'
import { auth } from '@/auth/auth'
import { db } from '@/lib/db'

export const getApplications = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    const applications = await db
      .select()
      .from(application)
      .where(eq(application.userId, session.user.id))
      .orderBy(desc(application.createdAt))

    return applications
  },
)
