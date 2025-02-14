'use client'

import { editToDB } from '@/local/sync'

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

import { ConfirmDelete } from './confirm-delete'
import { NotePreview } from './note-preview'
import { NoteUpdate } from './note-update'
import { buttonVariants } from './ui/button'

interface NoteProps {
  note: {
    id: string
    content: string
    lastModified: Date
  }
}

export const Note = ({ note }: NoteProps) => {
  const editor = useCreateEditor({ value: JSON.parse(note.content) })

  async function handleUpdate() {
    const value = editor.children
    if (!value) return
    const newContent = JSON.stringify(value)
    await editToDB(note.id, newContent)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative h-36 overflow-hidden rounded-md bg-card/20 transition-shadow duration-200 hover:shadow-lg md:h-44">
          <CardContent className="py-4">
            <NotePreview
              noteContent={note.content}
              key={note.lastModified.toISOString()}
            />
          </CardContent>
          <CardFooter className="invisible absolute bottom-0 right-0 justify-end group-hover:visible">
            <ConfirmDelete noteId={note.id} />
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-w-max pb-4 pt-12">
        <DialogTitle className="sr-only">Update Note</DialogTitle>
        <NoteUpdate editor={editor} />
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
