import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTag, getAllTags, deleteTag, editTag, validateTag } from "../databaseCalls/tags.db.js";
import { parseAccept } from "hono/utils/accept";

const tagRoutes = new Hono<{ Variables: { user: AuthenticatedUser } }>();

interface AuthenticatedUser {
    id: string;
    admin: boolean;
}


tagRoutes.get("/", authMiddleware, async (c) => {
    const tags = await getAllTags();
    return c.json(tags);
});


tagRoutes.post("/", authMiddleware, async (c) => {
    let tagToCreate: unknown;
    try {
        tagToCreate = await c.req.json();
    } catch (error) {
        return c.json({ error: "invalid json: " + error }, 400);
    }

    const validTag = await validateTag(tagToCreate);

    if (!validTag.success) {
        return c.json({ error: validTag.error.flatten(), message: "Invalid tag"	 }, 400);
    }

    const tag = await createTag(validTag.data);
    return c.json(tag);
    
})

tagRoutes.patch("/:id", authMiddleware, async (c) => {
    const tagId = parseInt(c.req.param("id"));
    const { name } = await c.req.json();
    if (!name) return c.json({ error: "Tag name is required" }, 400);
    const tag = await editTag(name, tagId);
    return c.json(tag);
    
})

tagRoutes.delete("/:id", authMiddleware, async (c) => {
    const tagId = parseInt(c.req.param("id"))
    const tag = await deleteTag(tagId);
    return c.json(tag);
    
})



export default tagRoutes;
