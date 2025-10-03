/*
  Warnings:

  - You are about to drop the column `activityTime` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `cityStopId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_tripId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "activityTime",
DROP COLUMN "title",
DROP COLUMN "tripId",
ADD COLUMN     "cityStopId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "destination",
ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "CityStop" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "arrival" TIMESTAMP(3),
    "departure" TIMESTAMP(3),
    "transport" TEXT,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "CityStop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CityStop" ADD CONSTRAINT "CityStop_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_cityStopId_fkey" FOREIGN KEY ("cityStopId") REFERENCES "CityStop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
