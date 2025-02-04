import { Plate } from '@udecode/plate/react'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useCreateEditor } from '@/components/editor/use-create-editor'
import { Editor, EditorContainer } from '@/components/plate-ui/editor'

import { ConfirmDelete } from './confirm-delete'
import Markdown from './markdown'
import { buttonVariants } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'

interface NoteProps {
  note: {
    id: string
    title: string
    content: string
  }
}

export const Note = ({ note }: NoteProps) => {
  const editor = useCreateEditor()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group overflow-hidden rounded-md bg-card/20 transition-shadow duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Markdown>{note.content}</Markdown>
          </CardContent>
          <CardFooter className="justify-end group-hover:visible">
            <ConfirmDelete noteId={note.id} />
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-w-max pb-4 pt-12">
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
          // onClick={handleSave}
          className={cn(buttonVariants({ variant: 'default' }), 'ml-auto')}
        >
          Update
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
