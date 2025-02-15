'use client'

import { editToDB } from '@/local/sync'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useCreateEditor } from '@/components/editor/use-create-editor'

import { ConfirmDelete } from './confirm-delete'
import { NotePreview } from './note-preview'
import { NoteUpdate } from './note-update'
import { Button } from './ui/button'

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
    <Sheet>
      <SheetTrigger asChild>
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
      </SheetTrigger>
      <SheetContent className="min-w-[65vw]">
        <SheetHeader>
          <SheetTitle>Update Note</SheetTitle>
          <SheetDescription>Edit your note.</SheetDescription>
        </SheetHeader>
        <div className="min-w-max pb-4 pt-6">
          <NoteUpdate editor={editor} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleUpdate}>Update</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
