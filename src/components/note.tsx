import { editToDB } from '@/local/sync'
import { deserializeMd } from '@udecode/plate-markdown'
import { Plate } from '@udecode/plate/react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useCreateEditor } from '@/components/editor/use-create-editor'
import { Editor, EditorContainer } from '@/components/plate-ui/editor'

import { ConfirmDelete } from './confirm-delete'
import Markdown from './markdown'
import { buttonVariants } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'

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
    const content = editor.api.markdown.serialize()
    if (!content) return
    await editToDB(note.id, content)
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
      <DialogContent className="max-w-[calc(100dvw-40px)] pb-4 pt-10 md:max-w-2xl md:pt-12">
        <div className="flex flex-col gap-y-3">
          <Plate editor={editor}>
            <EditorContainer className="rounded-sm border border-accent">
              <Editor
                variant="none"
                placeholder="Take a note..."
                className="max-h-[calc(100dvh-200px)] min-h-80 p-4"
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
