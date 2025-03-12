/*
  Warnings:

  - You are about to drop the column `taskId` on the `TaskImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskImage" DROP CONSTRAINT "TaskImage_taskId_fkey";

-- AlterTable
ALTER TABLE "TaskImage" DROP COLUMN "taskId";
