import { useRef } from 'react'
import db from '@/local/db'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useLiveQuery } from 'dexie-react-hooks'
import { useWindowSize } from 'usehooks-ts'

import { Note } from '@/components/note'

const CARD_HEIGHT = 176 // md:h-44 = 11rem * 16px = 176px
const CARD_GAP = 16 // gap-4 = 1rem * 16px = 16px

export default function Notes() {
  const parentRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowSize()

  const notes = useLiveQuery(() =>
    db.notes.orderBy('lastModified').reverse().toArray()
  )

  const virtualizer = useVirtualizer({
    count: notes?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT + CARD_GAP,
    overscan: 5,
    horizontal: false,
    getItemKey: (index) => {
      if (!notes?.[index]?.id) {
        console.warn(
          `Note at index ${index} has no ID.  This may cause issues.`
        )
        return `missing-id-${index}` // Or handle this better
      }
      return notes[index].id
    }
  })

  if (!notes || notes.length === 0) {
    return null
  }

  // Calculate the grid layout
  const items = virtualizer.getVirtualItems()
  const totalHeight = virtualizer.getTotalSize()

  return (
    <div ref={parentRef} className="overflow-auto px-4 md:px-10">
      <div className="relative w-full" style={{ height: `${totalHeight}px` }}>
        <div
          className="grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items.length > 0 ? items[0].start : 0}px)`
          }}
        >
          {items.map((virtualRow) => (
            <Note
              key={notes[virtualRow.index].id}
              note={notes[virtualRow.index]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
