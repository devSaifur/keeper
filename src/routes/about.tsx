import { Await, createFileRoute } from '@tanstack/react-router'

import { api } from '@/lib/api'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
  loader: async () => {
    const res = await api.hello.$get()
    const promiseData = res.json()
    return { promiseData }
  }
})

function AboutComponent() {
  const { promiseData } = Route.useLoaderData()

  return (
    <div className="p-2">
      <h3>About</h3>

      <Await promise={promiseData} fallback={<div>Loading...</div>}>
        {(data) => <div>{data}</div>}
      </Await>
    </div>
  )
}
