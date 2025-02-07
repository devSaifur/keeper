import { createMiddleware } from 'hono/factory';
import { auth } from './lib/auth';
export async function authMiddleware(c, next) {
    try {
        const session = await auth.api.getSession({ headers: c.req.raw.headers });
        if (!session) {
            c.set('user', null);
            c.set('session', null);
            return next();
        }
        c.set('user', session.user);
        c.set('session', session.session);
        return next();
    }
    catch (err) {
        console.log(err);
        c.set('user', null);
        c.set('session', null);
        return next();
    }
}
export const getUser = createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
        c.set('user', null);
        c.set('session', null);
        return c.json({ error: 'Unauthorized' }, 401);
    }
    c.set('user', session.user);
    c.set('session', session.session);
    return next();
});
