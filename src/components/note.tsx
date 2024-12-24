import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import Markdown from './markdown'

interface NoteProps {
  note: {
    id: string
    title: string
    content: string
  }
}

export const Note = ({ note }: NoteProps) => {
  return (
    <Card className="cursor-pointer bg-card/20 transition-shadow duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Markdown>{note.content}</Markdown>
      </CardContent>
    </Card>
  )
}
