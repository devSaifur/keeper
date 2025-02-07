import z from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be 6 characters or longer' })
    .max(16, { message: 'Password must be less than 16 characters' })
})

export type TSignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be 3 characters or longer' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be 6 characters or longer' })
    .max(16, { message: 'Password must be less than 16 characters' })
})

export type TSignUpSchema = z.infer<typeof signUpSchema>
