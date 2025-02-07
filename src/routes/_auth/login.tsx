import { getNotesFromServerAndSaveToDB } from '@/local/sync'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { signInSchema, TSignInSchema } from 'server/lib/validators'
import { toast } from 'sonner'

import { signIn } from '@/lib/auth-client'
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

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
  ssr: true
})

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

function LoginPage() {
  const router = useRouter()

  const { register, formState, handleSubmit } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { errors } = formState

  const handleSignIn = async (data: TSignInSchema) => {
    await signIn.email(
      {
        email: data.email,
        password: data.password
      },
      {
        onSuccess: async () => {
          await getNotesFromServerAndSaveToDB()
          toast.success('Logged in successfully')
          router.invalidate()
        },
        onError: () => {
          toast.error('An error occurred while logging in')
        }
      }
    )
  }

  return (
    <Card className="mx-auto mt-40 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                placeholder="m@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                {...register('password')}
                type="password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full"
            >
              {formState.isSubmitting ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>
        <div className="mt-8 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
