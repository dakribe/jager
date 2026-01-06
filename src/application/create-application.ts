import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { application } from './application.sql'
import { auth } from '@/auth/auth'

const createApplicationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobUrl: z.string().optional().or(z.literal('')),
  location: z.string().optional(),
})

export const createApplication = createServerFn({ method: 'POST' })
  .inputValidator(createApplicationSchema)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    const newApplication = await db
      .insert(application)
      .values({
        userId: session.user.id,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        jobUrl: data.jobUrl || null,
        location: data.location || null,
        status: 'applied',
      })
      .returning()

    return { success: true, application: newApplication[0] }
  })
