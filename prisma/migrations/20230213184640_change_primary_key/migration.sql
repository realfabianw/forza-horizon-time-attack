/*
  Warnings:

  - The primary key for the `Car` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Car` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Entry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Track` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Track` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `trackId` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `carId` on the `Entry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_carId_fkey";

-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_trackId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP CONSTRAINT "Car_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Car_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "trackId",
ADD COLUMN     "trackId" INTEGER NOT NULL,
DROP COLUMN "carId",
ADD COLUMN     "carId" INTEGER NOT NULL,
ADD CONSTRAINT "Entry_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Track" DROP CONSTRAINT "Track_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Track_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
