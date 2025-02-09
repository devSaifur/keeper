import { hc } from 'hono/client'

import { ApiType } from '@/app/api/[[...routes]]/route'

export const api = hc<ApiType>('/').api
