import exp from "constants";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users ?? null;
}

export async function getUser(username: string) {
    
}

export async function createUser(body: any) {
    const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            admin : false       
        },
    });
    return user??null;
}