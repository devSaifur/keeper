import { hc } from 'hono/client'
import { ApiType } from 'server/index'

export const api = hc<ApiType>('/').api
