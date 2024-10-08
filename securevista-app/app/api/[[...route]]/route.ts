import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { notices } from '@/schema';
import { D1Database } from '@cloudflare/workers-types';
import { handle } from 'hono/vercel'

export const runtime = 'edge';

// This ensures process.env.DB is correctly typed
type Bindings = {
  DB: D1Database
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB: D1Database;
      }
    }
  }

const app = new Hono<{ Bindings: Bindings}>().basePath('/api')

app.get('/notices', async (c) => {
  const db = drizzle(process.env.DB);
  const result = await db.select().from(notices).all();
  return c.json(result);
});

app.get('/notices/:id', async (c) => {
  const db = drizzle(process.env.DB);
  const id = c.req.param('id');
  const result = await db.select().from(notices).where(eq(notices.id, parseInt(id))).get();
  if (!result) return c.notFound();
  return c.json(result);
});

app.post('/notices', async (c) => {
  const db = drizzle(process.env.DB);
  const body = await c.req.json();
  const result = await db.insert(notices).values(body).run();
  return c.json(result);
});

app.put('/notices/:id', async (c) => {
  const db = drizzle(process.env.DB);
  const id = c.req.param('id');
  const body = await c.req.json();
  const result = await db.update(notices).set(body).where(eq(notices.id, parseInt(id))).run();
  return c.json(result);
});

app.delete('/notices/:id', async (c) => {
  const db = drizzle(process.env.DB);
  const id = c.req.param('id');
  const result = await db.delete(notices).where(eq(notices.id, parseInt(id))).run();
  return c.json(result);
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);