// import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import Editor from '@/components/editor'

// const Editor = lazy(() => import('@/components/editor'))

export const Route = createFileRoute('/_authenticated/')({
  component: HomeComponent
})

function HomeComponent() {
  return (
    <div className="p-2">
      {/* <Suspense fallback="loading editor..."> */}

      <Editor />

      {/* </Suspense> */}
    </div>
  )
}
