import { Hono} from "hono";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";
import { getAllCategories,createCategory, deleteCategory} from "../databaseCalls/categories.db.js";

const categoryRoutes = new Hono<{Variables: { user: AuthenticatedUser }}>();

interface AuthenticatedUser {
    id: string;
    admin: boolean;
}

categoryRoutes.get('/', async(c) => {
    
    const cats =await getAllCategories();
    return c.json(cats);

    //return c.json({ message: 'GET /categories' });
});


categoryRoutes.post('/', authMiddleware,adminMiddleware, async(c) => {
    try {
        const admin = c.get("user") as AuthenticatedUser;
        
        if (!admin.admin) {
            return c.json({ error: "Forbidden - Admin only" }, 403);
        }
        
        const body = await c.req.json();
        const newCategory = await createCategory(body.title);
        return c.json(newCategory);
    } catch (error) {
        return c.json({ error: "Error creating category" }, 500);
    }
    
    //return c.json({ message: 'POST /categories' });
});

categoryRoutes.delete('/:id', authMiddleware, adminMiddleware, async (c) => {

    try {
        const admin = c.get("user") as AuthenticatedUser;
        
        if (!admin.admin) {
            return c.json({ error: "Forbidden - Admin only" }, 403);
        }
        
        const id = c.req.param('id');
        await deleteCategory(id);
    } catch (error) {
        return c.json({ error: "Error deleting category" }, 500);
    }
    return c.json({ message: 'Deleted category with id: ' + c.req.param('id') });
    
   // return c.json({ message: 'DELETE /categories/:id' });
});


export default categoryRoutes