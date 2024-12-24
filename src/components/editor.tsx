import { useState } from 'react'
import { Editor as MilkDownEditor, rootCtx } from '@milkdown/kit/core'
import { commonmark } from '@milkdown/kit/preset/commonmark'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import { nord } from '@milkdown/theme-nord'

import { Button } from './ui/button'
import { Input } from './ui/input'

const Editor = () => {
  const [title, setTitle] = useState('')

  const { get } = useEditor((root) =>
    MilkDownEditor.make()
      .config(nord)
      .config((ctx) => {
        ctx.set(rootCtx, root)
      })
      .use(commonmark)
  )

  const handleSave = () => {}

  const handleCancel = () => {}

  return (
    <div className="relative mx-auto flex max-h-[500px] min-h-[75px] w-full max-w-2xl flex-col items-center gap-y-2 rounded border border-gray-700 px-2 py-1 shadow-2xl dark:border-gray-600">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border-2"
      />
      {/* <EditorContent
        editor={editor}
        className="prose-sm prose-gray w-full overflow-y-scroll rounded border-2 border-input dark:prose-invert [&>div]:px-2 [&>div]:py-1 [&>div]:outline-none [&>div]:focus-visible:ring-1 [&>div]:focus-visible:ring-ring"
      /> */}

      <Milkdown />

      <div className="ml-auto flex gap-x-2">
        <Button variant="destructive" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  )
}

const EditorWithProvider = () => {
  return (
    <MilkdownProvider>
      <Editor />
    </MilkdownProvider>
  )
}

export default EditorWithProvider
