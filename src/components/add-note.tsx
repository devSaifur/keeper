'use client'

import type { Note } from '@/local/db'
import { saveToDB } from '@/local/sync'
import { Plate } from '@udecode/plate/react'
import { PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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
    <Dialog>
      <DialogTrigger
        asChild
        className={cn(
          buttonVariants({ variant: 'default' }),
          'fixed bottom-14 right-14 z-50 size-16 cursor-pointer rounded-full shadow-2xl md:bottom-20 md:right-16'
        )}
      >
        <PlusIcon className="size-14 text-background" />
      </DialogTrigger>
      <DialogContent className="min-w-max pb-4 pt-12">
        <DialogTitle className="sr-only">Add Note</DialogTitle>
        <div className="mx-auto flex w-full max-w-min flex-col gap-y-3">
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

        <DialogClose
          type="button"
          onClick={handleSave}
          className={cn(buttonVariants({ variant: 'default' }), 'ml-auto')}
        >
          Save
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default AddNote
