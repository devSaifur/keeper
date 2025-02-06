import { api } from '@/lib/api'

import db from './db'

const SYNC_INTERVAL = 10000

async function addNotesSync() {
  const notes = await db.notes.toArray()

  const notesToSync = notes.filter(
    (note) => note.syncStatus === 'pending' || note.syncStatus === 'addError'
  )

  if (notesToSync.length === 0) {
    return
  }

  // prepare notes to sync by only including necessary fields
  const pendingNotes = notesToSync.map((note) => ({
    id: note.id,
    content: note.content
  }))

  try {
    const res = await api.notes.$post({
      json: pendingNotes
    })

    const results = await res.json()

    if (results.length > 0) {
      // update local notes sync status and server id
      await Promise.all(
        results.map(async (syncedNote) => {
          if (syncedNote.success) {
            await db.notes
              .where('id')
              .equals(syncedNote.noteId)
              .modify({
                syncStatus: 'synced',
                serverId: syncedNote.serverId as string,
                lastModified: new Date().toISOString()
              })
          } else {
            await db.notes.where('id').equals(syncedNote.noteId).modify({
              syncStatus: 'addError',
              lastModified: new Date().toISOString()
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

  if (notes.length === 0) {
    return
  }

  const pendingDeleteNotes = [
    ...notes
      .filter((note) => note.syncStatus === 'pending')
      .map((note) => note.id)
  ]

  try {
    const res = await api.notes.$delete({
      json: pendingDeleteNotes
    })

    if (res.ok) {
      await db.deletedNotes.bulkDelete(pendingDeleteNotes)
    }
  } catch (err) {
    console.error(err)
  }
}

export async function updateNoteSync() {
  const notes = await db.notes.toArray()

  const notesToSync = notes.filter(
    (note) => note.syncStatus === 'update' || note.syncStatus === 'updateError'
  )

  if (notesToSync.length === 0) {
    return
  }

  // prepare notes to sync by only including necessary fields
  const pendingNotes = notesToSync.map((note) => ({
    id: note.serverId as string,
    content: note.content
  }))

  try {
    const res = await api.notes.$put({
      json: pendingNotes
    })

    const results = await res.json()

    if (results.length > 0) {
      // update local notes sync status and server id
      await Promise.all(
        results.map(async (syncedNote) => {
          if (syncedNote.success) {
            await db.notes
              .where('id')
              .equals(syncedNote.noteId)
              .modify({
                syncStatus: 'synced',
                serverId: syncedNote.noteId as string,
                lastModified: new Date().toISOString()
              })
          } else {
            await db.notes.where('id').equals(syncedNote.noteId).modify({
              syncStatus: 'updateError',
              lastModified: new Date().toISOString()
            })
          }
        })
      )
    }
  } catch (error) {
    console.error(error)
  }
}

let syncIntervalId: Timer | undefined

function startSync() {
  if (!syncIntervalId) {
    syncIntervalId = setInterval(addNotesSync, SYNC_INTERVAL)
    syncIntervalId = setInterval(deleteNotesSync, SYNC_INTERVAL)
    syncIntervalId = setInterval(updateNoteSync, SYNC_INTERVAL)
  }
}

function stopSync() {
  if (syncIntervalId) {
    clearInterval(syncIntervalId)
    syncIntervalId = undefined
  }
}

if (navigator.onLine) {
  startSync()
}

self.addEventListener('online', startSync)
self.addEventListener('offline', stopSync)
