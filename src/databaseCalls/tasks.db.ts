import prisma from "../lib/client.js";
import { z } from "zod";
import xss from "xss";


// TODO: laga scema fyrir task
const taskSchema = z.object({
    id: z.string(),
    title: z.string().max(1000, "Title must be less than 1000 characters").min(1, "Title must be at least 1 character"),
    description: z.string().nullable(),
    due: z.date().nullable().optional(),
    categoryId: z.string().nullable(),
    userId: z.string().nullable(),
});

const createTaskSchema = z.object({
    title: z.string().max(1000, "Title must be less than 1000 characters").min(1, "Title must be at least 1 character"), // hérna voru 2 , en myndar ves f mig þannig bæta við ef issues
    description: z.string().nullable().optional(),
    due: z.date().nullable(),
    categoryId: z.string().nullable(),
    userId: z.string().nullable(),
});

type Task = z.infer<typeof taskSchema>;

export async function getAllTasks(userId: string, limit = 10, offset?: number): Promise<Array<Task> | null> {
    const tasks = await prisma.task.findMany(
        {
            where: { userId: userId },
            take: limit,
            skip: offset ?? 0
        }
    );
    return tasks ?? null;
}

export async function getTaskById(id: string, userId: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
        where: { 
            id: id,
            userId: userId 
        },
    })

    return task ?? null;
}

export async function createTask(body: z.infer<typeof createTaskSchema>, userId: string) {
    const safeTitle = xss(body.title);
    /*
    let safeDescription;

    if (body.description) {
        safeDescription = xss(body.description);
    }*/

    return await prisma.task.create({
        data: {
            title: safeTitle,
            description: body.description ?? null,
            due: body.due ?? null,
            categoryId: body.categoryId ?? null,	
            userId: userId,
        },
    });
}

export async function editTask(id: string, body: z.infer<typeof createTaskSchema>) {
    const safeTitle = xss(body.title);
    let safeDescription;

    if (body.description) {
        safeDescription = xss(body.description);
    }
    
    return await prisma.task.update({
        where: { id: id},
        data: {
            title: safeTitle ?? undefined,
            description: safeDescription ?? undefined,
            due: body.due ?? undefined,
            categoryId: body.categoryId ?? undefined
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

export async function validateTask(task: unknown) {
    const result = createTaskSchema.safeParse(task);
    return result;
}


export async function assignTagToTask(taskId: string, tagId: number) {
    const taskTag = await prisma.taskTags.create({
        data: {
            taskId: taskId,
            tagId: tagId
        }
    })

    return taskTag;

}

export async function removeTagFromTask(taskId: string, tagId: number) {
    const taskTag = await prisma.taskTags.delete({
        where: {
            taskId_tagId: {
                taskId: taskId,
                tagId: tagId
            }
        }
    })
    return taskTag;
}