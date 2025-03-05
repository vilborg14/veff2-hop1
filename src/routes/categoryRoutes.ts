import { Hono} from "hono";

const categoryRoutes = new Hono();

categoryRoutes.get('/', (c) => {
    return c.json({ message: 'GET /categories' });
});

categoryRoutes.post('/', (c) => {
    return c.json({ message: 'POST /categories' });
});

categoryRoutes.delete('/:id', (c) => {
    return c.json({ message: 'DELETE /categories/:id' });
});

export default categoryRoutes