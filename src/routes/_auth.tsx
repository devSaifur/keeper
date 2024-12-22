import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { userQueryOption } from '@/lib/queries'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient
    const user = await queryClient.fetchQuery(userQueryOption)
    if (user) {
      throw redirect({
        to: '/'
      })
    }
  },
  component: Outlet
})
