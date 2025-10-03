/*
  Warnings:

  - A unique constraint covering the columns `[shareId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trip_shareId_key" ON "Trip"("shareId");
