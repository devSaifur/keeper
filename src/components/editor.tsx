import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Button } from './ui/button'
import { Input } from './ui/input'

const Editor = () => {
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
    <div className="relative mx-auto flex max-h-[500px] min-h-[75px] w-full max-w-2xl flex-col items-center gap-y-2 rounded border border-gray-700 px-2 py-1 shadow-2xl dark:border-gray-600">
      <Input placeholder="Title" className="border-2" />
      <EditorContent
        editor={editor}
        className="prose-sm prose-gray w-full overflow-y-scroll rounded border-2 border-input dark:prose-invert [&>div]:px-2 [&>div]:py-1 [&>div]:outline-none [&>div]:focus-visible:ring-1 [&>div]:focus-visible:ring-ring"
      />

      <div className="ml-auto flex gap-x-2">
        <Button variant="destructive">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  )
}

export default Editor
