import { drizzle } from 'drizzle-orm/bun-sqlite'

import * as schema from './schema'

export const db = drizzle('database.sqlite', { schema })
