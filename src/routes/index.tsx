import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Editor } from '@/components/editor'

export const Route = createFileRoute('/')({
  component: HomeComponent
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Editor />
    </div>
  )
}
