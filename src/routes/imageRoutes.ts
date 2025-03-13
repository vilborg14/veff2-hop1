import { Hono } from "hono";


const imageRoutes = new Hono();


imageRoutes.get('/', (c) => {
    
    return c.json({ message: 'GET /images' });
});


imageRoutes.post('/', (c) => {

    return c.json({ message: 'POST /images' });
});

imageRoutes.delete('/:id', (c) => {
    return c.json({ message: 'DELETE /images/:id' });
});




export default imageRoutes

