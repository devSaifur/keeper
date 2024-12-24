import { useState } from 'react'
import {
  editorViewOptionsCtx,
  Editor as MilkDownEditor,
  rootCtx
} from '@milkdown/kit/core'
import { history } from '@milkdown/kit/plugin/history'
import { commonmark } from '@milkdown/kit/preset/commonmark'
import { getMarkdown } from '@milkdown/kit/utils'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const Editor = () => {
  const [title, setTitle] = useState('')

  const { get } = useEditor((root) =>
    MilkDownEditor.make()
      .config((ctx) => {
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            class:
              'ProseMirror prose-sm dark:prose-invert outline-none mx-auto border border-input px-2 py-4 box-border',
            spellcheck: 'false'
          }
        }))
        ctx.set(rootCtx, root)
      })
      .use(commonmark)
      .use(history)
  )

  const handleSave = async () => {
    const markdown = get()?.action(getMarkdown())

    if (!markdown) {
      return
    }

    const note = {
      title,
      content: markdown
    }
    console.log({ note })
  }

  const handleCancel = () => {}

  return (
    <div className="mx-auto flex max-h-[500px] min-h-[75px] w-full max-w-2xl flex-col items-center gap-y-2 rounded border border-gray-700 px-2 py-1 shadow-2xl dark:border-gray-600">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border-2"
      />

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
