import { createAuthClient } from 'better-auth/react'

export const { signIn, signUp, signOut, getSession } = createAuthClient()