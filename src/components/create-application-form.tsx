import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createApplication } from '@/application/create-application'

const applicationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobUrl: z.string().optional().or(z.literal('')),
  location: z.string().optional(),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

interface CreateApplicationFormProps {
  onSuccess?: () => void
}

export function CreateApplicationForm({
  onSuccess,
}: CreateApplicationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  })

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      await createApplication({ data })
      toast.success('Application created successfully')
      reset()
      onSuccess?.()
    } catch (error) {
      toast.error('Failed to create application')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
          <Input
            id="companyName"
            {...register('companyName')}
            placeholder="Acme Corp"
          />
          <FieldError
            errors={errors.companyName ? [errors.companyName] : undefined}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="jobTitle">Job Title</FieldLabel>
          <Input
            id="jobTitle"
            {...register('jobTitle')}
            placeholder="Software Engineer"
          />
          <FieldError
            errors={errors.jobTitle ? [errors.jobTitle] : undefined}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 @md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="jobUrl">Job URL</FieldLabel>
          <Input
            id="jobUrl"
            {...register('jobUrl')}
            placeholder="https://example.com/job"
          />
          <FieldError errors={errors.jobUrl ? [errors.jobUrl] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input
            id="location"
            {...register('location')}
            placeholder="San Francisco, CA"
          />
          <FieldError
            errors={errors.location ? [errors.location] : undefined}
          />
        </Field>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </div>
    </form>
  )
}
