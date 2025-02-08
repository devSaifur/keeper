import { toast } from 'sonner'

import { api } from '@/lib/api-client'

import db from './db'
import type { Note } from './db'

export async function saveToDB(note: Note) {
  await db.notes.add(note)
}

export async function deleteFromDB(id: string) {
  await db.notes.delete(id)
}

export async function editToDB(id: string, content: string) {
  await db.notes.where('id').equals(id).modify({
    content,
    syncStatus: 'update'
  })
}

export async function addToDeletedNotes(note: Note) {
  if (!note.serverId) return

  await db.deletedNotes.add({
    id: note.serverId,
    deletedAt: Date.now(),
    syncStatus: 'pending'
  })
}

export async function getNoteById(id: string) {
  return db.notes.get(id)
}

export async function getNotesFromServerAndSaveToDB() {
  try {
    const res = await api.notes.$get()
    if (!res.ok) {
      throw new Error('Something went wrong getting notes!')
    }

    const notes = await res.json()

    const notesToSave = notes.map((note) => ({
      id: crypto.randomUUID(),
      content: note.content,
      syncStatus: 'synced',
      serverId: note.id,
      createdAt: note.cratedAt
    }))

    await db.notes.clear()
    await db.notes.bulkAdd(notesToSave as Note[])
  } catch (err) {
    console.error(err)
    toast.error(
      'Something went wrong getting notes!, please try syncing manually'
    )
  }
}
