import { addToDeletedNotes, deleteFromDB, getNoteById } from '@/local/sync'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

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
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'

interface ConfirmDeleteProps {
  noteId: string
}

export const ConfirmDelete = ({ noteId }: ConfirmDeleteProps) => {
  async function handleDelete(id: string) {
    const noteToDelete = await getNoteById(id)
    if (!noteToDelete) return
    await deleteFromDB(id)
    await addToDeletedNotes(noteToDelete)
    toast.success('Note deleted successfully')
  }

  const handlePropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={handlePropagation}
        className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      >
        <TrashIcon className="text-red-700" strokeWidth={3} />
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
          <AlertDialogCancel onClick={handlePropagation}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.stopPropagation()
              await handleDelete(noteId)
            }}
            className="bg-red-700 text-white hover:bg-red-800"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
