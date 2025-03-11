import { Hono} from "hono";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllTasksForUser, getTaskById, createTask, updateTask, deleteTask } from '../databaseCalls/tasks.db.js';
import { auth } from "hono/utils/basic-auth";

//const taskRoutes = new Hono();
const taskRoutes = new Hono<{ Variables: { user: { id: string } } }>(); // 🛠 Laga context type


taskRoutes.get('/', authMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ error: "Notandi fannst ekki" }, 401);

    const page = Number(c.req.query('page')) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const tasks = await getAllTasksForUser(user.id, limit, offset);
    return c.json({ tasks });
    //return c.json({ message: 'GET /tasks' });
});

taskRoutes.post('/', authMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ error: "Notandi fannst ekki" }, 401);

    const body = await c.req.json();
    const newTask = await createTask(user.id, body);
    
    if (!newTask) return c.json({ error: "Villa við að búa til verkefni, athugaðu gögnin" }, 400);

    return c.json({ message: "Task búið til!", task: newTask });

    //return c.json({ message: 'POST /tasks' });
});

taskRoutes.get('/:id', authMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ error: "Notandi fannst ekki" }, 401);

    const taskId = c.req.param('id');
    const task = await getTaskById(user.id, taskId);
    
    if (!task) return c.json({ error: "Task fannst ekki eða þú átt það ekki" }, 404);

    return c.json({ task });
    
    //return c.json({ message: 'GET /tasks/:id' });
});

taskRoutes.patch('/:id', authMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ error: "Notandi fannst ekki" }, 401);

    const taskId = c.req.param('id');
    const body = await c.req.json();

    const updatedTask = await updateTask(user.id, taskId, body);
    if (!updatedTask) return c.json({ error: "Task fannst ekki eða þú átt það ekki" }, 404);

    return c.json({ message: "Task uppfært!", task: updatedTask });
    
    //return c.json({ message: 'PATCH /tasks/:id' });
});


taskRoutes.delete('/:id', authMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ error: "Notandi fannst ekki" }, 401);

    const taskId = c.req.param('id');
    const deleted = await deleteTask(user.id, taskId);
    
    if (!deleted) return c.json({ error: "Task fannst ekki eða þú átt það ekki" }, 404);

    return c.json({ message: "Task eytt!" });
    //return c.json({ message: 'DELETE /tasks/:id' });
});

// mynda routes koma probs hér

export default taskRoutes