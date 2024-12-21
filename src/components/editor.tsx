import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Input } from './ui/input'

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Take a note...'
      })
    ]
  })

  return (
    <div className="relative mx-auto flex max-h-[500px] min-h-[75px] w-full max-w-2xl flex-col items-center rounded border border-gray-600 px-2 py-1 shadow-2xl dark:border-gray-400">
      <Input placeholder="Title" />
      <EditorContent
        editor={editor}
        className="prose-sm prose-gray w-full overflow-y-scroll rounded dark:prose-invert [&>div]:px-2 [&>div]:py-1 [&>div]:outline-none"
      />
    </div>
  )
}
