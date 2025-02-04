import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      className="prose-sm dark:prose-invert"
    >
      {children}
    </ReactMarkdown>
  )
}

export default memo(Markdown)
