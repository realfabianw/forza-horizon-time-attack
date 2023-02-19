/*
  Warnings:

  - Added the required column `timestamp` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Entry_shareCode_key";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
