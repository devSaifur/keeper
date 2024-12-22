import { create } from 'zustand'

import type { Database, Note } from './db'

interface StoreState {
  notes: Note[]
}

export const useStore = create<StoreState>((set) => ({
  notes: [] as Note[],
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),

  syncNotes: async (db: Database) => {
    const notes = await db.notes.toArray()
    set({ notes })
  },

  deleteNote: (id: string) =>
    set((state) => ({
      notes: state.notes.filter((note: Note) => note.id !== id)
    }))
}))
