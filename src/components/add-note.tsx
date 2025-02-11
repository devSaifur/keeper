'use client'

import type { Note } from '@/local/db'
import { saveToDB } from '@/local/sync'
import { Plate } from '@udecode/plate/react'
import { PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { Editor, EditorContainer } from '@/components/plate-ui/editor'

const AddNote = () => {
  const editor = useCreateEditor()

  async function handleSave() {
    const value = editor.api.markdown.serialize()
    const note = {
      id: crypto.randomUUID(),
      content: value,
      createdAt: new Date().toISOString(),
      syncStatus: 'pending',
      serverId: ''
    } as Note
    await saveToDB(note)
  }

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className={cn(
          buttonVariants({ variant: 'default' }),
          'fixed bottom-14 right-14 z-50 size-16 cursor-pointer rounded-full shadow-2xl md:bottom-20 md:right-16'
        )}
      >
        <PlusIcon className="size-14 text-background" />
      </SheetTrigger>
      <SheetContent className="min-w-[72vw]">
        <SheetHeader>
          <SheetTitle>Add Note</SheetTitle>
          <SheetDescription>
            Take a note and save it to your notes.
          </SheetDescription>
        </SheetHeader>
        <div className="min-w-max pb-4 pt-12">
          <Plate editor={editor}>
            <EditorContainer className="mx-auto max-h-96 min-w-[42rem] rounded-sm border border-accent">
              <Editor
                variant="none"
                placeholder="Take a note..."
                className="max-h-screen min-h-80 p-4"
                autoFocus
              />
            </EditorContainer>
          </Plate>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleSave} type="submit">
              Save
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default AddNote
