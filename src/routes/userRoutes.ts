import { Hono } from 'hono';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';
import { getUserById, getUserByUsername, getAllUsers, createUser, loginUser, editUser } from '../databaseCalls/users.db.js';

const userRoutes = new Hono<{Variables: { user: AuthenticatedUser }}>();

interface AuthenticatedUser {
    id: string;
    admin: boolean;
}

/* Admin only route     */
userRoutes.get('/', authMiddleware, adminMiddleware, async(c) => {
    const users = await getAllUsers();
    //return c.json({ message: 'GET /users', users });
    return c.json(users)
});

userRoutes.get('/me', authMiddleware,async(c) => {
    const user = c.get("user") as { id: string; username: string; admin: boolean };
    
    if (!user) return c.json({ error: "User not found" }, 404);
    
    const dbUser = await getUserById(user.id);
    if (!dbUser) return c.json({ error: "User not found in database" }, 404);
    
    return c.json({message: 'GET /users/me', user: dbUser});

});

// TODO: fix the /:id and /me routes, they are mixing up, but working
userRoutes.patch('/me', authMiddleware, async(c) => {
    const user = c.get("user") as { id: string; username: string; admin: boolean };
    const editedUser = await c.req.json();

    
    if (!user) return c.json({ error: "User not found" }, 404);
    
    const dbUser = await getUserById(user.id);

    if (!dbUser) return c.json({ error: "User not found in database" }, 404);

    const changedUser = await editUser(user.id, editedUser);

    console.log("Changed user:", changedUser);
    console.log("edited user:", editedUser);

    return c.json({ message: 'PATCH /users/me', user: changedUser });
})

/* Admin only route */
userRoutes.get('/:id', authMiddleware, adminMiddleware,async(c) => {
    const user = c.get("user") as { id: string; username: string; admin: boolean };

    const username = c.req.param('id');
   // const id = c.req.param('id');

    if (!user) {
        return c.json({ error: "user not found" }, 401);
    }   

    if (!user.admin) {
        return c.json({ error: "Forbidden - Admin only" }, 403);
    }

    const dbUser = await getUserByUsername(username);
    // const dbUser = await getUserById(id);
    if (!dbUser) return c.json({ error: "User not found in database" }, 404);
    
    
    return c.json(dbUser);

        

    //return c.json({ message: 'GET /users/:id' });
});

/* Admin only route */
userRoutes.patch('/:id', authMiddleware, adminMiddleware, async (c) => {


    return c.json({ message: 'PATCH /users' });
});

/* Needs POST and DELETE admin only action, 
   create some action, or make somne other route Admin only? */

userRoutes.post('/register', async(c) => {
    const body = await c.req.json();
    
    createUser(body);
    
    return c.json({ message: 'POST /users/register', body });
});

userRoutes.post('/login', async(c) => {
    const body = await c.req.json();

    const result = await loginUser(body.username, body.password);
    
    if (!result) {
        return c.json({ error: "Invalid credentials" }, 401);
    }

    //return c.json({ token: result.token, user: result.user });

    return c.json({ message: 'POST /users/login', token : result });

    //return c.json({ message: 'POST /users/login' });
});





export default userRoutes
