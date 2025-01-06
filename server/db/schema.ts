import { InferSelectModel, relations, sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('user', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull()
})

export const userRelations = relations(userTable, ({ many }) => ({
  notes: many(noteTable)
}))

export const noteTable = sqliteTable('note', {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text()
    .notNull()
    .references(() => userTable.id),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
})

export const noteRelations = relations(noteTable, ({ one }) => ({
  user: one(userTable, {
    fields: [noteTable.userId],
    references: [userTable.id]
  })
}))

export type Note = InferSelectModel<typeof noteTable>
