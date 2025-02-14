'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import { useSession } from '@/lib/auth-client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import BackgroundSync from '@/components/background-sync'

const Notes = dynamic(() => import('@/components/notes'), {
  ssr: false,
  loading: () => <NoteSkeleton />
})

const AddNote = dynamic(() => import('@/components/add-note'), { ssr: false })

export default function Home() {
  const router = useRouter()
  const { data, isPending } = useSession()

  if (!data?.user && !isPending) {
    router.push('/login')
  }

  return (
    <main className="relative p-2">
      <Notes />
      <AddNote />
      <BackgroundSync />
    </main>
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
