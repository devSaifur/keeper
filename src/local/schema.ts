import {
  ANYONE_CAN,
  createSchema,
  createTableSchema,
  definePermissions,
  ExpressionBuilder,
  NOBODY_CAN,
  Row,
  TableSchema
} from '@rocicorp/zero'

const userSchema = createTableSchema({
  tableName: 'user',
  columns: {
    id: 'string',
    name: 'string',
    email: 'string'
  },
  primaryKey: 'id'
})

const noteSchema = createTableSchema({
  tableName: 'note',
  columns: {
    id: 'string',
    title: 'string',
    content: 'string',
    createdAt: 'string'
  },
  primaryKey: 'id',
  relationships: {
    userId: {
      sourceField: 'userId',
      destSchema: userSchema,
      destField: 'id'
    }
  }
})

export const schema = createSchema({
  version: 1,
  tables: {
    user: userSchema,
    note: noteSchema
  }
})

export type Schema = typeof schema
export type User = Row<typeof userSchema>
export type Note = Row<typeof noteSchema>

type AuthData = {
  session: string | null
}

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
  const allowIfLoggedIn = (
    authData: AuthData,
    { cmpLit }: ExpressionBuilder<TableSchema>
  ) => cmpLit(authData.session, 'IS NOT', null)

  return {
    user: {
      row: {
        insert: ANYONE_CAN,
        update: {
          preMutation: NOBODY_CAN
        },
        delete: NOBODY_CAN
      }
    },
    note: {
      row: {
        insert: [allowIfLoggedIn],
        update: {
          preMutation: [allowIfLoggedIn]
        },
        delete: [allowIfLoggedIn]
      }
    }
  }
})
