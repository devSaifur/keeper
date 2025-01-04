import { createLazyFileRoute } from '@tanstack/react-router'

import PlateEditor from '@/components/editor/plate-editor'
import Notes from '@/components/notes'

export const Route = createLazyFileRoute('/_authenticated/')({
  component: HomeComponent
})

function HomeComponent() {
  return (
    <div className="p-2">
      <PlateEditor />
      <Notes />
    </div>
  )
}
