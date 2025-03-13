import prisma from "../lib/client.js";
import { z } from "zod";

const tagSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Tag name must be at least 1 character").max(50, "Tag name must be less than 50 characters"),
});

export async function createTag(name: string) {
    return await prisma.tag.create({
        data: { name },
    });
}

export async function getAllTags() {
    return await prisma.tag.findMany();
}

export async function addTagToTask(taskId: string, tagId: string) {
    return await prisma.task.update({
        where: { id: taskId },
        data: { tags: { connect: { id: tagId } } },
    });
}

export async function removeTagFromTask(taskId: string, tagId: string) {
    return await prisma.task.update({
        where: { id: taskId },
        data: { tags: { disconnect: { id: tagId } } },
    });
}
