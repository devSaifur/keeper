import { create } from 'zustand'

import type { Note } from './db'
import db from './db'

interface StoreState {
  notes: Note[]
  addNote: (note: Note) => void
  editNote: (note: Note) => void
  syncNotes: () => Promise<void>
  deleteNote: (id: string) => void
}

export const useNoteStore = create<StoreState>((set) => ({
  notes: [] as Note[],

  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),

  editNote: (note: Note) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === note.id ? note : n))
    })),

  syncNotes: async () => {
    const notes = await db.notes.toArray()
    set({ notes })
  },

  deleteNote: (id: string) =>
    set((state) => ({
      notes: state.notes.filter((note: Note) => note.id !== id)
    }))
}))
