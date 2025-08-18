/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImage` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "deletedAt",
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "profileImage" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "HouseSale" (
    "id" SERIAL NOT NULL,
    "saleType" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "landType" TEXT,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "area" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "videos" TEXT[],
    "images" TEXT[],
    "price" INTEGER NOT NULL,

    CONSTRAINT "HouseSale_pkey" PRIMARY KEY ("id")
);
