import { Hono } from "hono";
import cloudinary from "../lib/cloudinary.js";
import prisma from "../lib/client.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const imageRoutes = new Hono<{ Variables: { user: AuthenticatedUser } }>();

interface AuthenticatedUser {
  id: string;
  admin: boolean;
}

imageRoutes.post("/", authMiddleware, async (c) => {
  try {
    const body = await c.req.parseBody();
    const imageBase64 = body.image; // tekur bara við base64-encoded image atm

    if (!imageBase64) {
      return c.json({ error: "No image provided" }, 400);
    }

    const uploadResult = await cloudinary.uploader.upload(imageBase64, {
      folder: "uploads",
    });

    const image = await prisma.image.create({
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
    });

    return c.json(image);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

imageRoutes.get("/", async (c) => {
  const images = await prisma.image.findMany();
  return c.json(images);
});

imageRoutes.get("/:id", async (c) => {
  const { id } = c.req.param();
  const image = await prisma.image.findUnique({ where: { id } });

  if (!image) {
    return c.json({ error: "Image not found" }, 404);
  }

  return c.json(image);
});

imageRoutes.delete("/:id", authMiddleware, async (c) => {
  try {
    const { id } = c.req.param();
    const image = await prisma.image.findUnique({ where: { id } });

    if (!image) {
      return c.json({ error: "Image not found" }, 404);
    }


    await cloudinary.uploader.destroy(image.publicId);


    await prisma.image.delete({ where: { id } });

    return c.json({ message: "Image deleted successfully" });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

export default imageRoutes;
