import { Hono} from "hono";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { 
    deleteTask, 
    createTask,
    getAllTasks,
    getTaskById,
    editTask,
    validateTask
} from "../databaseCalls/tasks.db.js";

const taskRoutes = new Hono<{Variables: { user: AuthenticatedUser }}>();
interface AuthenticatedUser {
    id: string;
    admin: boolean;
}

taskRoutes.get('/', authMiddleware, async (c) => {
    const user = c.get("user") as AuthenticatedUser;

    if (!user) {
        return c.json({ error: "User not found" }, 401);
    }

    const userId = user.id;

    const tasks = await getAllTasks(userId);
    if (!tasks) {
        return c.json({ error: "Tasks not found" }, 404);
    }

    return c.json({ tasks });
    //return c.json({ message: 'GET /tasks' });
});

taskRoutes.get('/:id', authMiddleware, async (c) => {
    const user = c.get("user") as AuthenticatedUser;

    if (!user) {
        return c.json({ error: "User not found" }, 401);
    }

    const userId = user.id;
    const id = c.req.param('id');

    if (!id) {
        return c.json({ error: "Task ID not provided" }, 400);
    }

    const task = await getTaskById(id, userId);

    if (!task) {
        return c.json({ error: "Task not found" }, 404);
    }

    return c.json({ task: task });
});

taskRoutes.post('/', authMiddleware,async (c) => {
    const user = c.get("user") as AuthenticatedUser;
    const userId = user.id;

    let taskToCreate: unknown;

    try {
        taskToCreate = await c.req.json();
    } catch (error) {
        return c.json({ error: "invalid json: " + error }, 400);
    }

    const validTask = await validateTask(taskToCreate);

    if (!validTask.success) {
        return c.json({ error: validTask.error.flatten(), message: "Invalid task"	 }, 400);
    }

    await createTask(validTask.data, userId);

    return c.json({ message: 'POST /tasks', task: validTask });
    
});

taskRoutes.delete('/:id', authMiddleware, async (c) => {
    const user = c.get("user") as AuthenticatedUser;
    const userId = user.id;
    const id = c.req.param('id');

    if (!id) {
        return c.json({ error: "Task ID not provided" }, 400);
    }

    const deletedTask = await deleteTask(id, userId);

    if (!deletedTask) {
        return c.json({ error: "Task not found" }, 404);
    }

    return c.json({ message: 'task deleted with id: ' + id });
});


taskRoutes.patch('/:id', authMiddleware, async(c) => {
    const user = c.get("user") as AuthenticatedUser;
    const id = c.req.param('id');

    if (!id) {
        return c.json({ error: "Task ID not provided" }, 400);
    }

    if (!user) {
        return c.json({ error: "User not found" }, 401);
    }
    let taskToEdit: unknown;

    try {
        taskToEdit = await c.req.json();
    } catch (error) {
        return c.json({ error: "invalid json: " + error }, 400);
    }

    const validTask = await validateTask(taskToEdit);

    if (!validTask.success) {
        return c.json({ error: validTask.error.flatten(), message: "Invalid task"	 }, 400);
    }

    const editedTask = await editTask(id, validTask.data);


    
    return c.json({ task: editedTask, message: "task edited" });
    //return c.json({ message: 'PATCH /tasks/:id' });
});


// mynda routes koma probs hér

export default taskRoutes