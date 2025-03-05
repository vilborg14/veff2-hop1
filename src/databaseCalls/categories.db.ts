import prisma from "../lib/client.js";
import { z } from "zod";

const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    tasks: z.array(z.string()),
});

const createCategorySchema = z.object({
    name: z.string(),
});

type Category = z.infer<typeof categorySchema>;


