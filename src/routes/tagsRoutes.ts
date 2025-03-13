import { Hono } from "hono";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTag, getAllTags, addTagToTask, removeTagFromTask } from "../databaseCalls/tags.db.js";

const tagRoutes = new Hono<{ Variables: { user: AuthenticatedUser } }>();

interface AuthenticatedUser {
    id: string;
    admin: boolean;
}

tagRoutes.post("/", authMiddleware, async (c) => {
    const { name } = await c.req.json();
    if (!name) return c.json({ error: "Tag name is required" }, 400);
    const tag = await createTag(name);
    return c.json(tag);
});

tagRoutes.get("/", authMiddleware, async (c) => {
    const tags = await getAllTags();
    return c.json(tags);
});

tagRoutes.post("/:taskId/tags/:tagId", authMiddleware, async (c) => {
    const { taskId, tagId } = c.req.param();
    const updatedTask = await addTagToTask(taskId, tagId);
    return c.json(updatedTask);
});

tagRoutes.delete("/:taskId/tags/:tagId", authMiddleware, async (c) => {
    const { taskId, tagId } = c.req.param();
    const updatedTask = await removeTagFromTask(taskId, tagId);
    return c.json(updatedTask);
});

export default tagRoutes;
