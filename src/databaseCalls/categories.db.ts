import prisma from "../lib/client.js";
import { z } from "zod";
import xss from "xss";

const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    tasks: z.array(z.string()),
});

const createCategorySchema = z.object({
    name: z.string(),
});

type Category = z.infer<typeof categorySchema>;

// Category info: category is public route, but only admin can create and delete


// TODO: implement the calls using type Category
export async function getAllCategories() {

    return await prisma.category.findMany();
}

export async function createCategory(name: string) {
    const safeTitle = xss(name);
    return await prisma.category.create({
        data: {
            title: safeTitle,
        },
    });
}

export async function deleteCategory(id: string) {
    return await prisma.category.delete({
        where: { id: id },
    });
}


