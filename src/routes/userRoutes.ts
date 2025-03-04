import { Hono } from 'hono';



const slay = new Hono();


slay.get('slay', (c) => {
    return c.json({ message: 'slay' });
});


export default slay
