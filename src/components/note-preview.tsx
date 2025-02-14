import { Plate } from '@udecode/plate/react'

import { useCreateEditor } from './editor/use-create-editor'
import { Editor, EditorContainer } from './plate-ui/editor'

export const NotePreview = ({ noteContent }: { noteContent: string }) => {
  const editor = useCreateEditor({
    value: JSON.parse(noteContent),
    readOnly: true
  })

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="none" readOnly />
      </EditorContainer>
    </Plate>
  )
}
