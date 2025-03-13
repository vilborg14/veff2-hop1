import prisma from "../lib/client.js";
import { z } from "zod";
import xss from "xss";

const tagSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Tag name must be at least 1 character").max(50, "Tag name must be less than 50 characters"),
});

const createTagSchema = z.object({
    name: z.string().min(1, "Tag name must be at least 1 character").max(50, "Tag name must be less than 50 characters"),
})

type Tag = z.infer<typeof tagSchema>;

export async function createTag(task: z.infer<typeof createTagSchema>): Promise<Tag> {
    const safeName = xss(task.name)
    return await prisma.tag.create({
        data: {
            name: safeName,
        },
    });

}

export async function getAllTags(): Promise<Array<Tag> | null> {
    const tags = await prisma.tag.findMany();
    return tags ?? null;
    
}


export async function editTag(name: string,id:number): Promise<Tag> {
    const safeName = xss(name)
    const tag = await prisma.tag.update({
        where: { id: id },
        data: {
            name: safeName
        },
    })
    return tag
}

export async function deleteTag(id:number): Promise<Tag> {
    const tag = await prisma.tag.delete({
        where: { id: id },
    })
    return tag
    
}


export async function validateTag(tagToValidate: unknown) {
    const result = createTagSchema.safeParse(tagToValidate);
    return result;
}
