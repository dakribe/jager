import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Calendar, ExternalLink } from 'lucide-react'
import { getApplications } from '@/application/get-applications'
import { CreateApplicationModal } from '@/components/create-application-modal'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/_authed/applications')({
  loader: async () => {
    return await getApplications()
  },
  component: RouteComponent,
})

function RouteComponent() {
  const applications = useLoaderData({ from: '/_authed/applications' })

  if (applications.length === 0) {
    return (
      <div className="container py-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <p className="text-muted-foreground text-lg">
            You haven't added any applications yet.
          </p>
          <p className="text-muted-foreground text-sm">
            Start tracking your job applications by adding your first one.
          </p>
          <CreateApplicationModal>
            <Button>Add Your First Application</Button>
          </CreateApplicationModal>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Applications</h1>
          <CreateApplicationModal>
            <Button>New Application</Button>
          </CreateApplicationModal>
        </div>
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{app.companyName}</CardTitle>
                    <CardDescription>{app.jobTitle}</CardDescription>
                  </div>
                  <Badge variant="secondary">{app.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {app.location && (
                  <p className="text-sm text-muted-foreground">
                    {app.location}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  {new Date(app.createdAt).toLocaleDateString()}
                </div>
                {app.jobUrl && (
                  <a
                    href={app.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="size-3" />
                    View Job Posting
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
