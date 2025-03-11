import prisma from "../lib/client.js";
import { z } from "zod";
import xss from "xss";

// TODO: laga schema fyrir task
const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    priority: z.boolean(),
    status: z.string(),
    due: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    images: z.array(
        z.object({
            id: z.string(),
            url: z.string(),
        })
    ).optional(),

});

const createTaskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.boolean(),
    status: z.string(),
    due: z.string(),
    categoryId: z.string(),
    tags: z.array(z.string()).optional(),
    images: z.array(
        z.object({
            id: z.string(),
            url: z.string(),
        })
    ).optional(),
});

type Task = z.infer<typeof taskSchema>;

export async function getAllTasksForUser(userId: string, limit: number, offset: number) {
    console.log("Fetching tasks for user:", userId);
    
    return await prisma.task.findMany({
        where: { userId },
        take: limit,
        skip: offset,
    });
}

export async function getTaskById(userId: string, taskId: string) {
    return await prisma.task.findFirst({
        where: { id: taskId, userId },
        include: {
            tags: true,  
            images: true, 
        }
    });
}

export async function createTask(userId: string, body: any) {
    const validatedData = createTaskSchema.safeParse(body);
    if (!validatedData.success) {
        console.error("Validation failed:", validatedData.error);
        return null;
    }

    console.log("Creating task for user:", userId);

    return await prisma.task.create({
        data: {
            title: xss(body.title),
            description: xss(body.description || ""),
            priority: body.priority,
            status: body.status,
            due: body.due ? new Date(body.due) : undefined,
            categoryId: body.categoryId,
            userId,
            tags: {
                connect: body.tags?.map((tagId: string) => ({
                    tag: { connect: { id: tagId } }
                })) || [],
            },
            images: {
                connectOrCreate: body.images?.map((image: { id: string; url: string }) => ({
                    where: {id: image.id || "new-image-id"},
                    create: {id: image.id || undefined, url: image.url},
                })) || [],
            },
            
            
        },
        include: {
            tags: true,
            images: true,
        }
    });
}

export async function updateTask(userId: string, taskId: string, body: any) {
    return await prisma.task.update({
        where: { id: taskId, userId },
        data: {
            title: body.title ? xss(body.title) : undefined,
            description: body.description ? xss(body.description) : undefined,
            priority: body.priority || undefined,
            status: body.status || undefined, 
            due: body.due ? new Date(body.due) : undefined,
            category: body.category || undefined,
            tags: body.tags
                ? { connect: body.tags.map((tagId: string) => ({ id: tagId })) }
                : undefined,
            images: body.images
                ? { connect: body.images.map((imageId: string) => ({ id: imageId })) }
                : undefined,
        },
        include: {
            tags: true,
            images: true,
        }
    });
}


export async function deleteTask(userId: string, taskId: string) {
    return await prisma.task.delete({
        where: { id: taskId, userId },
    });
}
