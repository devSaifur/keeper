import { create } from 'zustand'

import type { Database, Note } from './db'

type TNote = Pick<Note, 'id' | 'title' | 'content'>

interface StoreState {
  notes: TNote[]
  addNote: (note: TNote) => void
  syncNotes: (db: Database) => Promise<void>
  deleteNote: (id: string) => void
}

export const useNoteStore = create<StoreState>((set) => ({
  notes: [] as TNote[],
  addNote: (note: TNote) => set((state) => ({ notes: [...state.notes, note] })),

  syncNotes: async (db: Database) => {
    const notes = (await db.notes.toArray()).map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content
    }))
    set({ notes })
  },
  deleteNote: (id: string) =>
    set((state) => ({
      notes: state.notes.filter((note: TNote) => note.id !== id)
    }))
}))
