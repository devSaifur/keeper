import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { getSession } from '@/lib/auth-client'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const { data } = await getSession()
    if (data?.user) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: Outlet
})
