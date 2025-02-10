import { hc } from 'hono/client'

import type { ApiType } from '@/app/api/[[...routes]]/route'

export const api = hc<ApiType>('/').api
