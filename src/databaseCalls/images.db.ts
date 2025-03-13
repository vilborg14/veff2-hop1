

import prisma from "../lib/client.js";
import cloudinary from "../lib/cloudinary.js";



export async function getAllImages() {
    const images = await prisma.taskImage.findMany();
    return images;
}

export async function getImageById(id: number) {
    const image = await prisma.taskImage.findUnique({
        where: { id: id },
    });
    return image;
}

export async function deleteImage(id: number) {
    return await prisma.taskImage.delete({
        where: { id: id },
    });
}

export async function createImage(url: string) {
    const result = await cloudinary.uploader.upload(url, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
        }
    });

    const image = await prisma.taskImage.create({
        data: {
            url: result.secure_url,
        },
    })

    return image
}