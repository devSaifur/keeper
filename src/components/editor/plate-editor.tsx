import type { Note } from '@/local/db'
import { saveToDB } from '@/local/sync'
import { Plate } from '@udecode/plate/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Button } from '@/components/ui/button'
import { useCreateEditor } from '@/components/editor/use-create-editor'
import { Editor, EditorContainer } from '@/components/plate-ui/editor'

export function PlateEditor() {
  const editor = useCreateEditor({ showFixedToolbar: false })

  async function handleSave() {
    const content = editor.api.markdown.serialize()
    if (!content) return
    const note = {
      id: crypto.randomUUID(),
      title: '',
      content,
      lastModified: Date.now(),
      syncStatus: 'pending',
      serverId: ''
    } as Note
    await saveToDB(note)
  }

  return (
    <div className="mx-auto flex w-full max-w-min flex-col">
      <DndProvider backend={HTML5Backend}>
        <Plate editor={editor}>
          <EditorContainer className="mx-auto max-h-96 min-w-[42rem] rounded-sm border border-accent px-3 pb-4 pt-2">
            <Editor variant="none" placeholder="Take a note..." />
          </EditorContainer>
        </Plate>
      </DndProvider>
      <Button onClick={handleSave} className="ml-auto">
        Save
      </Button>
    </div>
  )
}

export default PlateEditor
