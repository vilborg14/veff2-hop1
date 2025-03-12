//import {bcrypt} from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/client.js";
import { z } from "zod";
import xss from "xss";

const bcrypt = await import("bcryptjs");

// nýtt stuff að let prisma 
const SECRET_KEY = process.env.JWT_SECRET || "a-string-secret-at-least-256-bits-long"; 

const userSchema = z.object({
    id: z.string(),
    username: z.string(),
    password: z.string(),
    admin: z.boolean(),
});

const createUserSchema = z.object({
    username: z.string(),
    password: z.string()
})

type User = z.infer<typeof userSchema>;

export async function getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    return user ?? null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        
        where: { username: username },
    });
    return user ?? null;  
}



export async function loginUser(username: string, password: string) {
    const user = await getUserByUsername(username);
    if (!user) return null;

    console.log(user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return "Invalid password";

    // TODO: change to resonable time
    const token = jwt.sign({ id: user.id, admin: user.admin }, SECRET_KEY, { expiresIn: "3h" });

    console.log(token);
    return token;
}

export async function getAllUsers(limit = 10, offset?: number): Promise<Array<User> | null> {
    const users = await prisma.user.findMany(
        {
            take: limit,
            skip: offset,
        }
    );
    return users ?? null;
}

export async function createUser(body: z.infer<typeof createUserSchema>) {
    const safeUsername = xss(body.username);
    const safePassword = xss(body.password);

    const hashedPassword = await bcrypt.hash(safePassword, 10);

    const user = await prisma.user.create({
        data: {
            username: safeUsername,
            password: hashedPassword,
            admin : false,     
        },
    });
    return user??null;
}


export async function editUser(id: string, body: User) {
    const safeUsername = xss(body.username);
    const safePassword = xss(body.password);    

    const hashedPassword = await bcrypt.hash(safePassword, 10);
    const user = await prisma.user.update({
        where: { id: id },
        data: {
            username: safeUsername,
            password: hashedPassword,
            admin : body.admin,
        },
    });
    return user ?? null;
}

export async function validateUser(userToValidate: unknown) {
    const result = createUserSchema.safeParse(userToValidate);
    return result;
}


console.log("Bcrypt check:", bcrypt ? "Loaded" : "Not loaded");


export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    loginUser,
    editUser,
    validateUser
};