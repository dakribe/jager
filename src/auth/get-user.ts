import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from './auth'

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({
    headers,
  })

  return {
    name: session?.user.name,
    email: session?.user.email,
    image: session?.user.image,
  }
})
