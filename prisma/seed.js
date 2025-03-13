import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                username: "admin",
                password: 'password',
                admin: true,
            },
            {
                username: "user1",
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

    await prisma.category.createMany({
        data: [
            {
                title: "Category 1",
            },
            {
                title: "Category 2",
            },
            {
                title: "Category 3",
            },
            {
                title: "Category 4",
            },
            {
                title: "Category 5",
            },
            {
                title: "Category 6",
            },
            {
                title: "Category 7",
            },
            {
                title: "Category 8",
            },
            {
                title: "Category 9",
            },
            {
                title: "Category 10",
            }
        ],
    })

    await prisma.tag.createMany({
        data: [
            {
                name: "Tag 1",
            },
            {
                name: "Tag 2",
            },
            {
                name: "Tag 3",
            },
            {
                name: "Tag 4",
            },
            {
                name: "Tag 5",
            },
            {
                name: "Tag 6",
            },
            {
                name: "Tag 7",
            }
        ],
    })


    await prisma.taskImage.createMany({
        data: [
            {
                id: 1,
                url: "https://example.com/image1.jpg",
            },
            {
                id: 2,
                url: "https://example.com/image2.jpg",
            },
            {
                id: 3,
                url: "https://example.com/image3.jpg",
            }
        ],
    })




}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
