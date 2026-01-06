import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { authClient } from '@/auth/auth-client'
import { Button } from '@/components/ui/button'
import { CreateApplicationModal } from '@/components/create-application-modal'

export const Route = createFileRoute('/_authed/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useLoaderData({ from: '/_authed' })

  return (
    <div>
      <div className="mb-4">
        <p>{user.name}</p>
        <p>{user.email}</p>
        <Button onClick={() => authClient.signOut}>Sign Out</Button>
      </div>
      <CreateApplicationModal />
    </div>
  )
}
