import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { getSession } from '@/lib/auth-client'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const { data } = await getSession()
    if (!data?.user) {
      throw redirect({
        to: '/login'
      })
    }
  },
  component: Outlet
})
