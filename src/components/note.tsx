import { useEffect, useRef, useState } from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { ConfirmDelete } from './confirm-delete'
import Markdown from './markdown'

interface NoteProps {
  note: {
    id: string
    title: string
    content: string
  }
}

// const TRANSITION = {
//   type: 'spring',
//   bounce: 0.05,
//   duration: 0.3
// }

export const Note = ({ note }: NoteProps) => {
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openMenu = () => {
    setIsOpen(true)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <Card
        onClick={openMenu}
        className="group overflow-hidden bg-card/20 transition-shadow duration-200 hover:shadow-lg"
      >
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

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div
            ref={editorContainerRef}
            className="relative flex h-[26rem] w-[42rem] flex-col overflow-hidden bg-white px-2 py-4 outline-none dark:bg-zinc-700"
          >
            <p>hello</p>
          </div>
        </div>
      )}
    </>
  )
}
