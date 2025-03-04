import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.createMany({
        data: [
            {
                username: "admin",
                password: 'password',
                admin: true,
            },
            {
                username: "user",
                password: 'password',
                admin: false,
            },
            {
                username: "user2",
                password: 'password',
                admin: false,
            }
        ],
    });

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
