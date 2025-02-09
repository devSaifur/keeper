'use client'

import { editToDB } from '@/local/sync'
import { deserializeMd } from '@udecode/plate-markdown'
import { Plate } from '@udecode/plate/react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useCreateEditor } from '@/components/editor/use-create-editor'
import { Editor, EditorContainer } from '@/components/plate-ui/editor'

import { ConfirmDelete } from './confirm-delete'
import Markdown from './markdown'
import { buttonVariants } from './ui/button'

interface NoteProps {
  note: {
    id: string
    content: string
  }
}

export const Note = ({ note }: NoteProps) => {
  const editor = useCreateEditor()
  editor.tf.setValue(deserializeMd(editor, note.content))

  async function handleUpdate() {
    const value = editor.api.markdown.serialize()
    if (!value) return
    await editToDB(note.id, value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative h-36 overflow-hidden rounded-md bg-card/20 transition-shadow duration-200 hover:shadow-lg md:h-44">
          <CardContent className="py-4">
            <Markdown>{note.content}</Markdown>
          </CardContent>
          <CardFooter className="invisible absolute bottom-0 right-0 justify-end group-hover:visible">
            <ConfirmDelete noteId={note.id} />
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-w-max pb-4 pt-12">
        <DialogTitle className="sr-only">Update Note</DialogTitle>
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

        <DialogClose
          type="button"
          onClick={handleUpdate}
          className={cn(buttonVariants({ variant: 'default' }), 'ml-auto')}
        >
          Update
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
