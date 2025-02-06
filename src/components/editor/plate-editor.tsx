import type { Note } from '@/local/db'
import { saveToDB } from '@/local/sync'
import { Plate } from '@udecode/plate/react'

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
      content,
      syncStatus: 'pending',
      serverId: '',
      createdAt: new Date().toISOString()
    } as Note
    await saveToDB(note)
  }

  return (
    <div className="mx-auto flex w-full max-w-min flex-col">
      <Plate editor={editor}>
        <EditorContainer className="mx-auto max-h-96 min-w-[42rem] rounded-sm border border-accent px-3 pb-4 pt-2">
          <Editor variant="none" placeholder="Take a note..." />
        </EditorContainer>
      </Plate>

      <Button onClick={handleSave} className="ml-auto">
        Save
      </Button>
    </div>
  )
}

export default PlateEditor
