import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { ConfirmDelete } from './confirm-delete'
import { EditEditor } from './edit-editor'
import Markdown from './markdown'

interface NoteProps {
  note: {
    id: string
    title: string
    content: string
  }
}

const TRANSITION = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.3
}

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

  const MotionCard = motion.create(Card)

  return (
    <MotionConfig transition={TRANSITION}>
      <MotionCard
        onClick={openMenu}
        style={{
          borderRadius: 8
        }}
        layoutId={isOpen ? undefined : `note-${note.id}`}
        className="group bg-card/20 transition-shadow duration-200 hover:shadow-lg"
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Markdown>{note.content}</Markdown>
        </CardContent>
        <CardFooter className="invisible justify-end group-hover:visible">
          <ConfirmDelete noteId={note.id} />
        </CardFooter>
      </MotionCard>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={editorContainerRef}
              style={{
                borderRadius: 12
              }}
              layoutId={`note-${note.id}`}
              className="relative flex h-[26rem] w-[42rem] flex-col overflow-hidden bg-white px-2 py-4 outline-none dark:bg-zinc-700"
            >
              <EditEditor
                note={note}
                closeMenu={closeMenu}
                ref={editorContainerRef}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
