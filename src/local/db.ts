import Dexie from 'dexie'

export interface Note {
  id: string
  content: string
  syncStatus:
    | 'pending'
    | 'synced'
    | 'update'
    | 'addError'
    | 'updateError'
    | 'deleteError'
  lastModified: Date
  serverId?: string
}

export interface DeletedNote {
  id: string
  deletedAt: number
  syncStatus: 'pending'
}

export interface Database extends Dexie {
  notes: Dexie.Table<Note, string>
  deletedNotes: Dexie.Table<DeletedNote, string>
}

const db = new Dexie('Database') as Database

db.version(3).stores({
  notes: 'id, content, lastModified, serverId',
  deletedNotes: 'id, deletedAt, syncStatus'
})

export default db
