import { Hono} from "hono";

const taskRoutes = new Hono<{Variables: { user: AuthenticatedUser }}>();
interface AuthenticatedUser {
    id: string;
    admin: boolean;
}

taskRoutes.get('/', (c) => {
    return c.json({ message: 'GET /tasks' });
});

taskRoutes.post('/', (c) => {
    return c.json({ message: 'POST /tasks' });
});

taskRoutes.get('/:id', (c) => {
    return c.json({ message: 'GET /tasks/:id' });
});

taskRoutes.patch('/:id', (c) => {
    return c.json({ message: 'PATCH /tasks/:id' });
});


taskRoutes.delete('/:id', (c) => {
    return c.json({ message: 'DELETE /tasks/:id' });
});

// mynda routes koma probs hér

export default taskRoutes