/*
  Warnings:

  - You are about to drop the `supervisors` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "cuti" ADD COLUMN     "SupervisorId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "position" VARCHAR(50);

-- DropTable
DROP TABLE "supervisors";
