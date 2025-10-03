/*
  Warnings:

  - Made the column `phoneNumber` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "phoneNumber" SET NOT NULL;
