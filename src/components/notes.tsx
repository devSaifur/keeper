import React, { useRef } from 'react'
import db from '@/local/db'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useLiveQuery } from 'dexie-react-hooks'
import { useWindowSize } from 'usehooks-ts'

import { Note } from '@/components/note'

export default function Notes() {
  const { width } = useWindowSize()
  const notes = useLiveQuery(() =>
    db.notes.orderBy('lastModified').reverse().toArray()
  )

  const parentRef = useRef<HTMLDivElement>(null)

  const getColumnsCount = () => {
    if (width >= 768) return 4 // md
    if (width >= 640) return 3 // sm
    return 1 // default
  }

  const columns = getColumnsCount()

  const rowVirtualizer = useVirtualizer({
    count: notes ? Math.ceil(notes.length / columns) : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20,
    overscan: 2
  })

  if (!notes || notes.length === 0) {
    return null
  }

  return (
    <div ref={parentRef} className="px-4 md:px-10">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowIndex = virtualRow.index
          return (
            <div
              key={virtualRow.key}
              className="mb-4 grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {Array.from({ length: columns }).map((_, columnIndex) => {
                const noteIndex = rowIndex * columns + columnIndex
                const note = notes[noteIndex]

                if (!note) return null

                return <Note key={note.id} note={note} />
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
