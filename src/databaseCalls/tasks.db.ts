import exp from "constants";
import prisma from "../lib/client.js";
import { z } from "zod";
import xss from "xss";


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

export async function getAllTasks(userId: string) {
    return await prisma.task.findMany(
        {
            where: { userId: userId },
        }
    );
}

export async function getTaskById(id: string, userId: string) {
    return await prisma.task.findUnique({
        where: { id: id, userId: userId },
    });
}

export async function createTask(body: any, userId: string, id: string) {
    const safeTitle = xss(body.title);
    const safeDescription = xss(body.description);


    return await prisma.task.create({
        data: {
            title: safeTitle,
            description: safeDescription,
            category: body.category,
            userId: userId,
        },
    });
}

export async function editTask(id: string, body: any) {
    const safeTitle = xss(body.title);
    const safeDescription = xss(body.description);

    return await prisma.task.update({
        where: { id: id},
        data: {
            title: safeTitle,
            description: safeDescription
        },
    });
    
}





export async function deleteTask(id: string, userId : string) {
    return await prisma.task.delete({
        where: { 
            id: id, 
            userId: userId 
        },
    });
}
