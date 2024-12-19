import { InferSelectModel, relations, sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const userTable = sqliteTable('user', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique()
})

export const userRelations = relations(userTable, ({ many }) => ({
  notes: many(noteTable)
}))

export const noteTable = sqliteTable('note', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int()
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
