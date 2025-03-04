import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config";
import { getAllUsers, createUser, loginUser, getUserById } from './users.db.js'
import { create } from 'domain'
import { authMiddleware, adminMiddleware } from "./middleware/authMiddleware.js";



//const app = new Hono()
const app = new Hono<{ Variables: { user: AuthenticatedUser } }>();

interface AuthenticatedUser {
  id: string;
  admin: boolean;
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//app.get('/users', async (c) => {
  //const users = await getAllUsers();

 // return c.json(users)
//})

app.post('/users/register', async (c) => {

  const body = await c.req.json();

  createUser(body);

  return c.json(body)

})

//nýtt 
app.post("/users/login", async (c) => {
    const body = await c.req.json();
    const result = await loginUser(body.username, body.password);

    if (!result) {
        return c.json({ error: "Invalid credentials" }, 401);
    }

    return c.json({ token: result.token, user: result.user });
});
// Verndað route: Aðeins innskráður notandi getur nálgast
app.get("/users/me", authMiddleware, async (c) => {
 // const user = c.get("user") as AuthenticatedUser;
 const user = c.get("user") as { id: string; username: string; admin: boolean };

  if (!user) return c.json({ error: "User not found" }, 404);

  const dbUser = await getUserById(user.id);
  if (!dbUser) return c.json({ error: "User not found in database" }, 404);

  return c.json({
      id: dbUser.id,
      username: dbUser.username,
      admin: dbUser.admin,
    }); 
 // return c.json(user);
});

// Aðeins admin getur séð alla notendur
app.get("/users", authMiddleware, adminMiddleware, async (c) => {
  const users = await getAllUsers();
  return c.json(users);
});




serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
});
