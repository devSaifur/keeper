import { useNoteStore } from '@/local/store'
import { deleteFromDB } from '@/local/sync'
import { TrashIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import Markdown from './markdown'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'
import { Button } from './ui/button'

interface NoteProps {
  note: {
    id: string
    title: string
    content: string
  }
}

export const Note = ({ note }: NoteProps) => {
  const { deleteNote } = useNoteStore()

  async function handleDelete(id: string) {
    deleteNote(id)
    await deleteFromDB(id)
  }

  return (
    <Card className="group cursor-pointer bg-card/20 transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Markdown>{note.content}</Markdown>
      </CardContent>
      <CardFooter className="invisible justify-end group-hover:visible">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button size="icon" variant="ghost">
              <TrashIcon className="text-red-700" strokeWidth={3} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                note and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete.bind(null, note.id)}
                className="bg-red-700 text-white hover:bg-red-800"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
