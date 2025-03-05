import prisma from "../lib/client.js";
import { z } from "zod";


// TODO: laga scema fyrir task
const taskSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    priority: z.string(),
    status: z.string(),
    dueDate: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    images: z.array(z.string()),
});

const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    priority: z.string(),
    status: z.string(),
    dueDate: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    images: z.array(z.string()),
});

type Task = z.infer<typeof taskSchema>;

