import { deleteFromDB } from '@/local/sync'
import { TrashIcon } from 'lucide-react'

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

interface ConfirmDeleteProps {
  noteId: string
}

export const ConfirmDelete = ({ noteId }: ConfirmDeleteProps) => {
  async function handleDelete(id: string) {
    await deleteFromDB(id)
  }

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={handleOpen}>
        <Button size="icon" variant="ghost">
          <TrashIcon className="text-red-700" strokeWidth={3} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your note
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => await handleDelete(noteId)}
            className="bg-red-700 text-white hover:bg-red-800"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
