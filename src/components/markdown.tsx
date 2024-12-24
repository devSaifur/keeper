import { memo } from 'react'
import ReactMarkdown from 'react-markdown'

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown className="prose-sm dark:prose-invert">
      {children}
    </ReactMarkdown>
  )
}

export default memo(Markdown)
