/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "TaskImage" DROP CONSTRAINT "TaskImage_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTags" DROP CONSTRAINT "TaskTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TaskTags" DROP CONSTRAINT "TaskTags_taskId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "TaskImage";

-- DropTable
DROP TABLE "TaskTags";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Name" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Name_pkey" PRIMARY KEY ("id")
);
