import * as React from 'react'
import { CreateApplicationForm } from './create-application-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface CreateApplicationModalProps {
  children?: React.ReactNode
}

export function CreateApplicationModal({
  children,
}: CreateApplicationModalProps) {
  const [open, setOpen] = React.useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="default">Create Application</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>
        <CreateApplicationForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
