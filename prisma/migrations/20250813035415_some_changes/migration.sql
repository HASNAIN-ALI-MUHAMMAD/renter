/*
  Warnings:

  - The values [Mixed_Use] on the enum `ZONING` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address` on the `AgriculturalProperty` table. All the data in the column will be lost.
  - The `cropHistory` column on the `AgriculturalProperty` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `country` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType` on the `Property` table. All the data in the column will be lost.
  - Added the required column `propertyCategory` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `purpose` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PURPOSE" AS ENUM ('RENT', 'SALE', 'LEASE');

-- CreateEnum
CREATE TYPE "public"."STATUS" AS ENUM ('AVAILABLE', 'SOLD', 'RENTED', 'LEASED');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ZONING_new" AS ENUM ('Residential', 'Commercial', 'Industrial', 'Other');
ALTER TABLE "public"."LandProperty" ALTER COLUMN "zoning" TYPE "public"."ZONING_new" USING ("zoning"::text::"public"."ZONING_new");
ALTER TYPE "public"."ZONING" RENAME TO "ZONING_old";
ALTER TYPE "public"."ZONING_new" RENAME TO "ZONING";
DROP TYPE "public"."ZONING_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."AgriculturalProperty" DROP COLUMN "address",
DROP COLUMN "cropHistory",
ADD COLUMN     "cropHistory" JSONB;

-- AlterTable
ALTER TABLE "public"."Location" DROP COLUMN "country";

-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "propertyType",
ADD COLUMN     "propertyCategory" "public"."PropertyCategory" NOT NULL,
DROP COLUMN "purpose",
ADD COLUMN     "purpose" "public"."PURPOSE" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT;

-- DropEnum
DROP TYPE "public"."Purpose";
