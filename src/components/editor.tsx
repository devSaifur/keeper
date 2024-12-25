import { useRef, useState } from 'react'
import db from '@/local/db'
import { useNoteStore } from '@/local/store'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import { useOnClickOutside } from 'usehooks-ts'

import { Button } from './ui/button'
import { Input } from './ui/input'

const extensions = [
  StarterKit,
  Markdown,
  Placeholder.configure({ placeholder: 'Type something...' })
]

const Editor = () => {
  const [title, setTitle] = useState('')
  const [isEditorVisible, setIsEditorVisible] = useState(false)
  const { addNote } = useNoteStore()

  const ref = useRef(null)

  const editor = useEditor({
    extensions
  })

  const handleSave = async () => {
    setIsEditorVisible(false)
    const markdown = editor?.storage.markdown.getMarkdown()

    if (!markdown || !title) {
      return
    }

    const note = {
      title,
      content: markdown,
      id: crypto.randomUUID()
    }
    console.log({ note })

    await db.notes.add({
      ...note,
      syncStatus: 'pending',
      lastModified: Date.now()
    })

    addNote(note)

    setTitle('')
  }

  useOnClickOutside(ref, handleSave)

  return (
    <div
      ref={ref}
      className="mx-auto flex max-h-[500px] min-h-[75px] w-full max-w-2xl flex-col items-center gap-y-2 overflow-y-scroll rounded border border-gray-700 px-2 py-1 shadow-2xl dark:border-gray-600"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsEditorVisible(true)}
        placeholder="Title"
        className="border-2"
        required
      />

      {isEditorVisible && (
        <>
          <EditorContent
            editor={editor}
            className="w-full text-left [&>div]:rounded-md [&>div]:border-2 [&>div]:border-input [&>div]:px-3 [&>div]:py-1 [&>div]:outline-none [&>div]:focus-visible:ring-1 [&>div]:focus-visible:ring-ring [&>div]:disabled:cursor-not-allowed"
          />
          <Button variant="ghost" className="ml-auto">
            Close
          </Button>
        </>
      )}
    </div>
  )
}

export default Editor
