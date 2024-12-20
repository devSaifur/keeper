import { Hono } from 'hono'
import {logger} from 'hono/logger'
import { hello } from './routes/hello'

const api = new Hono().basePath('/api').route('/hello', hello)

api.use(logger())

export default api

export type ApiType = typeof api