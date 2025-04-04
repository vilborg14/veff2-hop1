import prisma from "../src/lib/client.js";
import bcrypt from "bcrypt";

async function main() {
    const user = await prisma.user.create({
        data: {
            username: "admin",
            password: await bcrypt.hash("password", 10),
            admin: true,
        },
    });
    console.log(user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

