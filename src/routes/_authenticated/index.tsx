import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const AddNote = lazy(() => import('@/components/add-note'))
const Notes = lazy(() => import('@/components/notes'))

export const Route = createFileRoute('/_authenticated/')({
  component: HomeComponent
})

function HomeComponent() {
  return (
    <div className="relative min-h-screen p-2">
      <Suspense fallback={<NoteSkeleton />}>
        <Notes />
        <AddNote />
      </Suspense>
    </div>
  )
}

function NoteSkeleton() {
  return (
    <div className="grid auto-rows-max grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 md:px-10 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card className="h-36 md:h-44" key={i}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-2/3" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-full" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
