'use client'

import { useEffect } from 'react'
import db, { Note } from '@/local/db'
import { toast } from 'sonner'

import { api } from '@/lib/api-client'

const SYNC_INTERVAL = 10000

async function initNotes() {
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
      lastModified: new Date()
    }))

    // filer out the notes that already exist in the database
    const existingNotes = await db.notes.toArray()
    notesToSave.forEach((note) => {
      const existingNote = existingNotes.find(
        (existingNote) => existingNote.id === note.serverId
      )
      if (existingNote) {
        notesToSave.splice(notesToSave.indexOf(note), 1)
      }
    })

    // add the notes that don't exist in the database
    await db.notes.bulkAdd(notesToSave as Note[])
  } catch (err) {
    console.error(err)
    toast.error(
      'Something went wrong getting notes!, please try syncing manually'
    )
  }
}

async function addNotesSync() {
  const notes = await db.notes.toArray()
  const notesToSync = notes.filter(
    (note) => note.syncStatus === 'pending' || note.syncStatus === 'addError'
  )

  if (notesToSync.length === 0) return

  // Prepare notes by only including necessary fields
  const pendingNotes = notesToSync.map((note) => ({
    id: note.id,
    content: note.content
  }))

  try {
    const res = await api.notes.$post({ json: pendingNotes })
    const results = await res.json()

    if (results.length > 0) {
      await Promise.all(
        results.map(async (syncedNote) => {
          if (syncedNote.success) {
            await db.notes
              .where('id')
              .equals(syncedNote.noteId)
              .modify({
                syncStatus: 'synced',
                serverId: syncedNote.serverId as string,
                lastModified: new Date()
              })
          } else {
            await db.notes.where('id').equals(syncedNote.noteId).modify({
              syncStatus: 'addError',
              lastModified: new Date()
            })
          }
        })
      )
    }
  } catch (error) {
    console.error(error)
  }
}

async function deleteNotesSync() {
  const notes = await db.deletedNotes.toArray()
  if (notes.length === 0) return

  const pendingDeleteNotes = notes
    .filter((note) => note.syncStatus === 'pending')
    .map((note) => note.id)

  await api.notes.$delete({ json: pendingDeleteNotes })
  await db.deletedNotes.bulkDelete(pendingDeleteNotes)
}

async function updateNoteSync() {
  const notes = await db.notes.toArray()
  const notesToSync = notes.filter(
    (note) => note.syncStatus === 'update' || note.syncStatus === 'updateError'
  )

  if (notesToSync.length === 0) return

  const pendingNotes = notesToSync.map((note) => ({
    id: note.id,
    content: note.content,
    serverId: note.serverId as string
  }))

  try {
    const res = await api.notes.$put({ json: pendingNotes })
    const results = await res.json()

    if (results.length > 0) {
      await Promise.all(
        results.map(async (syncedNote) => {
          if (syncedNote.success) {
            await db.notes.where('id').equals(syncedNote.noteId).modify({
              syncStatus: 'synced',
              serverId: syncedNote.serverId,
              lastModified: new Date()
            })
          } else {
            await db.notes.where('id').equals(syncedNote.noteId).modify({
              syncStatus: 'updateError',
              lastModified: new Date()
            })
          }
        })
      )
    }
  } catch (error) {
    console.error(error)
  }
}

export default function BackgroundSync() {
  initNotes()

  useEffect(() => {
    // Define interval IDs for each sync operation
    const addNotesIntervalId = setInterval(addNotesSync, SYNC_INTERVAL)
    const deleteNotesIntervalId = setInterval(deleteNotesSync, SYNC_INTERVAL)
    const updateNotesIntervalId = setInterval(updateNoteSync, SYNC_INTERVAL)

    // Start syncing immediately if online
    if (navigator.onLine) {
      addNotesSync()
      deleteNotesSync()
      updateNoteSync()
    }

    // Event handlers for online/offline changes
    const handleOnline = () => {
      // Optionally, you can re-run the sync functions when coming online.
      addNotesSync()
      deleteNotesSync()
      updateNoteSync()
    }

    const handleOffline = () => {
      console.log('Offline: sync will pause until connection is restored.')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Clean up intervals and event listeners on component unmount
    return () => {
      clearInterval(addNotesIntervalId)
      clearInterval(deleteNotesIntervalId)
      clearInterval(updateNotesIntervalId)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // This component does not render any visible UI
  return null
}
