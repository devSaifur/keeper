import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

const Editor = lazy(() => import('@/components/editor'))

export const Route = createFileRoute('/_authenticated/')({
  component: HomeComponent
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Suspense fallback="loading editor...">
        <Editor />
      </Suspense>
    </div>
  )
}
