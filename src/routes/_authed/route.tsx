import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { getUser } from '@/auth/get-user'
import { Toaster } from '@/components/ui/sonner'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export const Route = createFileRoute('/_authed')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getUser()
    if (!user) {
      throw redirect({ to: '/' })
    }

    return user
  },
  loader: ({ context }) => {
    return context
  },
})

function RouteComponent() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger />
          <Outlet />
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </>
  )
}
