import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { getAllUsers, createUser } from './users.db.js'
import { create } from 'domain'


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/users', async (c) => {
  const users = await getAllUsers();

  return c.json(users)
})

app.post('/users/register', async (c) => {

  const body = await c.req.json();

  createUser(body);

  return c.json(body)

})




serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
