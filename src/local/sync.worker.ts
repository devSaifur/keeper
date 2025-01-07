import { toast } from 'sonner'

import { api } from '@/lib/api'

import db from './db'

const SYNC_INTERVAL = 5000

async function syncNotes() {
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

    toast.success(`Synced ${results.length} notes`)

    if (results.length > 0) {
      // update local notes sync status and server id
      await Promise.all(
        results.map(async (noteInfo, idx) => {
          if (noteInfo.success) {
            const localNote = notesToSync[idx]

            await db.notes.where('title').equals(localNote.title).modify({
              syncStatus: 'synced',
              serverId: noteInfo.noteId,
              lastModified: Date.now()
            })

            toast.success(`Notes successfully synced`)
          } else {
            const localNote = notesToSync[idx]

            await db.notes.where('title').equals(localNote.title).modify({
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

let syncIntervalId: Timer | undefined

function startSync() {
  if (!syncIntervalId) {
    syncIntervalId = setInterval(syncNotes, SYNC_INTERVAL)
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
