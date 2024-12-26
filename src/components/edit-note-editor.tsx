import { forwardRef, RefObject, useState } from 'react'
import { useNoteStore } from '@/local/store'
import { editToDB } from '@/local/sync'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import { useOnClickOutside } from 'usehooks-ts'

import { Button } from './ui/button'
import { Input } from './ui/input'

interface EditEditorProps {
  note: {
    id: string
    title: string
    content: string
  }
  closeMenu: () => void
}

const extensions = [StarterKit, Markdown]

export const EditNoteEditor = forwardRef<HTMLDivElement, EditEditorProps>(
  function EditEditor({ note, closeMenu }: EditEditorProps, containerRef) {
    const [title, setTitle] = useState(note.title)
    const { editNote } = useNoteStore()

    const editor = useEditor({
      extensions,
      content: note.content
    })

    const handleSave = async () => {
      const markdown = editor?.storage.markdown.getMarkdown()

      if (
        !markdown ||
        !title ||
        (note.content === markdown && title === note.title)
      ) {
        return closeMenu()
      }

      await editToDB(note.id, title, markdown)

      editNote({
        id: note.id,
        title,
        content: markdown
      })

      closeMenu()
    }

    useOnClickOutside(containerRef as RefObject<HTMLDivElement>, handleSave)

    return (
      <>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border-2"
          required
        />

        <EditorContent
          editor={editor}
          className="w-full text-left [&>div]:rounded-md [&>div]:px-1 [&>div]:py-2 [&>div]:outline-none [&>div]:focus-visible:ring-1 [&>div]:focus-visible:ring-ring [&>div]:disabled:cursor-not-allowed"
        />
        <Button
          variant="outline"
          className="absolute bottom-2 right-2 ml-auto"
          onClick={handleSave}
        >
          Close
        </Button>
      </>
    )
  }
)
