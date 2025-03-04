import exp from "constants";
import { PrismaClient } from "@prisma/client";
//import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const bcrypt = await import("bcryptjs");

// nýtt stuff að let prisma 
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "yurr"; 


export async function getUserById(id: string) {
    return await prisma.user.findUnique({
        where: { id: id },
    });
}



export async function loginUser(username: string, password: string) {
    const user = await getUserById(username);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return null;

    const token = jwt.sign({ id: user.id, admin: user.admin }, SECRET_KEY, { expiresIn: "1h" });

    return { token, user };
}

//let prisma = new PrismaClient();

export async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users ?? null;
}

export async function getUser(username: string) {
    
}

export async function createUser(body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
        data: {
            username: body.username,
            password: hashedPassword,
            admin : false       
        },
    });
    return user??null;
}

console.log("Bcrypt check:", bcrypt ? "Loaded" : "Not loaded");
