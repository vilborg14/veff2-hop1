import { Hono } from "hono";

import { deleteImage, getAllImages, createImage } from "../databaseCalls/images.db.js";


const imageRoutes = new Hono();


imageRoutes.get('/', async(c) => {

    const url = await getAllImages();

    return c.json({ message: 'GET /images', url });
});


// postman crashaði í hvert skipti sem ég reyndi að uploada inni þar, thus gat ekki testað, en að setja link virkar. 
imageRoutes.post('/', async(c) => {
    try {
        //const body = await c.req.parseBody();

        //console.log('body: ',body);



        const image = await createImage('https://placedog.net/800/600');

    
        return c.json({ message: 'image uploaded', image: image});
    } catch (error) {
        return c.json({ error: "Error uploading image: " + error}, 400);
    }
});



imageRoutes.delete('/:id', (c) => {
    const id = parseInt(c.req.param('id'));

    if (!id) {
        return c.json({ error: "Image ID not provided" }, 400);
    }

    deleteImage(id);

    return c.json({ message: 'Image deleted' });

});


export default imageRoutes

