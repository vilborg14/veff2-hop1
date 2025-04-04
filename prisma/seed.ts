import prisma from "../src/lib/client.js";
import bcrypt from "bcrypt";

async function main() {
    const admin = await prisma.user.create({
        data: {
            username: "admin",
            password: await bcrypt.hash("password", 10),
            admin: true,
        },
    });

    const user = await prisma.user.create({
        data: {
            username: "user",
            password: await bcrypt.hash("password", 10)
        },
    });

    console.log({ admin, user });
    
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


/*

npm install
npx prisma db push
npx prisma db seed

# til að endursetja gagnagrunn
npx prisma db push --force-reset
npx prisma db seed+
*/