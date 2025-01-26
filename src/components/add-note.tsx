import type { Note } from '@/local/db'
import { saveToDB } from '@/local/sync'
import { Plate } from '@udecode/plate/react'
import { MaximizeIcon, PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog'
import { useCreateEditor } from '@/components/editor/use-create-editor'
import { Editor, EditorContainer } from '@/components/plate-ui/editor'

export const AddNote = () => {
  const editor = useCreateEditor()

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          asChild
          className="absolute bottom-20 right-20 size-16 cursor-pointer rounded-full shadow-2xl"
        >
          <PlusIcon className="size-14 text-background" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-max pb-4 pt-12">
        <div
          // onClick={() => setIsFullScreen((prev) => !prev)}
          className="absolute right-12 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <MaximizeIcon className="size-4" />
          <span className="sr-only">Toggle Fullscreen</span>
        </div>

        <div className="mx-auto flex w-full max-w-min flex-col gap-y-3">
          <Plate editor={editor}>
            <EditorContainer className="mx-auto max-h-96 min-w-[42rem] rounded-sm border border-accent">
              <Editor
                variant="none"
                placeholder="Take a note..."
                className="max-h-screen min-h-80 p-4"
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
