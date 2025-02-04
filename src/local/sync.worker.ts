import { api } from '@/lib/api'

import db from './db'

const SYNC_INTERVAL = 10000

async function addNotesSync() {
  const notes = await db.notes.toArray()

  const notesToSync = notes.filter((note) => note.syncStatus === 'pending')

  if (notesToSync.length === 0) {
    return
  }

  // prepare notes to sync by only including necessary fields
  const pendingNotes = notesToSync.map((note) => ({
    id: note.id,
    title: note.title,
    content: note.content
  }))

  console.log(`Syncing ${pendingNotes.length} notes`)

  try {
    const res = await api.notes.$post({
      json: pendingNotes
    })

    const { results } = await res.json()

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
                lastModified: Date.now()
              })
          } else {
            await db.notes.where('id').equals(syncedNote.noteId).modify({
              syncStatus: 'error',
              lastModified: Date.now()
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

  console.log(`Syncing ${notes.length} deleted notes`)

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

let syncIntervalId: Timer | undefined

function startSync() {
  if (!syncIntervalId) {
    syncIntervalId = setInterval(addNotesSync, SYNC_INTERVAL)
    syncIntervalId = setInterval(deleteNotesSync, SYNC_INTERVAL)
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
