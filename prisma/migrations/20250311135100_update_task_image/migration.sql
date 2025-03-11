/*
  Warnings:

  - The primary key for the `TaskImage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TaskImage" DROP CONSTRAINT "TaskImage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TaskImage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TaskImage_id_seq";
