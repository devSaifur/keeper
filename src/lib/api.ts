import { ApiType } from '@server/index';
import { hc } from 'hono/client';

export const api = hc<ApiType>('/').api