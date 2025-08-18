/*
  Warnings:

  - You are about to drop the column `contact` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `HouseSale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."PropertyCategory" AS ENUM ('LAND', 'HOUSE', 'AGRICULTURAL');

-- CreateEnum
CREATE TYPE "public"."Purpose" AS ENUM ('RENT', 'SALE', 'LEASE');

-- CreateEnum
CREATE TYPE "public"."ZONING" AS ENUM ('Residential', 'Commercial', 'Industrial', 'Mixed_Use', 'Other');

-- DropForeignKey
ALTER TABLE "public"."HouseSale" DROP CONSTRAINT "HouseSale_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "contact",
DROP COLUMN "password",
DROP COLUMN "profileImage",
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "public"."HouseSale";

-- DropTable
DROP TABLE "public"."Session";

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "propertyType" "public"."PropertyCategory" NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "videos" TEXT[],
    "images" TEXT[],
    "price" JSONB NOT NULL,
    "purpose" "public"."Purpose" NOT NULL,
    "status" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LandProperty" (
    "id" TEXT NOT NULL,
    "area" JSONB NOT NULL,
    "dimensions" JSONB NOT NULL,
    "zoning" "public"."ZONING" NOT NULL,
    "isDeveloped" BOOLEAN NOT NULL,
    "accessRoad" BOOLEAN NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "LandProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HouseProperty" (
    "id" TEXT NOT NULL,
    "area" JSONB NOT NULL,
    "dimensions" JSONB NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "kitchen" INTEGER NOT NULL,
    "floors" INTEGER NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "servantRoom" BOOLEAN NOT NULL,
    "lawn" BOOLEAN NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "HouseProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AgriculturalProperty" (
    "id" TEXT NOT NULL,
    "address" JSONB,
    "area" JSONB NOT NULL,
    "dimensions" JSONB NOT NULL,
    "soilType" TEXT,
    "irrigation" TEXT,
    "topography" TEXT,
    "tenure" TEXT,
    "cropHistory" TEXT,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "AgriculturalProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandProperty_propertyId_key" ON "public"."LandProperty"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "HouseProperty_propertyId_key" ON "public"."HouseProperty"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "AgriculturalProperty_propertyId_key" ON "public"."AgriculturalProperty"("propertyId");

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LandProperty" ADD CONSTRAINT "LandProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HouseProperty" ADD CONSTRAINT "HouseProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AgriculturalProperty" ADD CONSTRAINT "AgriculturalProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
