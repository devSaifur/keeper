import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, TSignUpSchema } from '@server/lib/validators'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createLazyFileRoute('/_auth/register')({
  component: RegisterPage
})

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

function RegisterPage() {
  const router = useRouter()

  const { register, formState, handleSubmit } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const { errors } = formState

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async (data: TSignUpSchema) => {
      const res = await api.auth['sign-up'].$post({
        json: data
      })
      if (!res.ok) {
        return toast.error('Something went wrong!')
      }
      toast.success('Signed up successfully, you can now login.')
      router.navigate({ to: '/login' })
    }
  })

  return (
    <Card className="mx-auto mt-40 max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit((data) => signUp(data))}>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input {...register('name')} placeholder="Max Robinson" />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} placeholder="m@example.com" />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input {...register('password')} type="password" />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                'Create an account'
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
