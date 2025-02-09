'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signUp } from '@/lib/auth-client'
import { signUpSchema, TSignUpSchema } from '@/lib/validators'
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

export default function RegisterPage() {
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

  const handleSignUp = async (data: TSignUpSchema) => {
    await signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password
      },
      {
        onSuccess: () => {
          toast.success('Account created successfully')
          router.push('/login')
        },
        onError: () => {
          toast.error('An error occurred while creating your account')
        }
      }
    )
  }

  return (
    <Card className="mx-auto mt-40 max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSignUp)}>
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
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full"
            >
              {formState.isSubmitting ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                'Create an account'
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
