import { createFileRoute } from '@tanstack/react-router'

import { AddNote } from '@/components/add-note'
import Notes from '@/components/notes'

export const Route = createFileRoute('/_authenticated/')({
  component: HomeComponent
})

function HomeComponent() {
  return (
    <div className="p-2">
      <Notes />
      <AddNote />
    </div>
  )
}
