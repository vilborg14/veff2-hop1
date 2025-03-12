import prisma from "../lib/client.js";
import { z } from "zod";
import xss from "xss";

const categorySchema = z.object({
    id: z.string(),
    title: z.string(),
});

const createCategorySchema = z.object({
    title: z.string(),
});

type Category = z.infer<typeof categorySchema>;

// Category info: category is public route, but only admin can create and delete


// TODO: implement the calls using type Category
export async function getAllCategories(limit=10, offset?: number):
    Promise<Array<Category>> {
        const categories = await prisma.category.findMany(
            {
                take: limit,
                skip: offset,
            }
        );
    return categories ?? null;

}

export async function createCategory(title: string) {
    const safeTitle = xss(title);
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

export function validateCategory(category: unknown) {
    const result = createCategorySchema.safeParse(category);
    return result
}


