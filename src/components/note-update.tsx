import { Plate, type PlateEditor } from '@udecode/plate/react'

import { Editor, EditorContainer } from './plate-ui/editor'

export const NoteUpdate = ({ editor }: { editor: PlateEditor }) => {
  return (
    <div className="mx-auto flex w-full max-w-min flex-col gap-y-3">
      <Plate editor={editor}>
        <EditorContainer className="mx-auto max-h-96 min-w-[42rem] rounded-sm border border-accent">
          <Editor
            variant="none"
            className="max-h-screen min-h-80 p-4"
            autoFocus
          />
        </EditorContainer>
      </Plate>
    </div>
  )
}
