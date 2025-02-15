import { Plate, type PlateEditor } from '@udecode/plate/react'

import { Editor, EditorContainer } from './plate-ui/editor'

export const NoteUpdate = ({ editor }: { editor: PlateEditor }) => {
  return (
    <Plate editor={editor}>
      <EditorContainer className="mx-auto rounded-sm border border-accent">
        <Editor variant="none" className="h-[72dvh] p-4" autoFocus />
      </EditorContainer>
    </Plate>
  )
}
