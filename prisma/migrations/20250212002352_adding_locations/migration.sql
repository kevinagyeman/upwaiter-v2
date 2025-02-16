/*
  Warnings:

  - You are about to drop the column `country` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `waiters` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `waiters` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `waiters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[location_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "country",
DROP COLUMN "province",
DROP COLUMN "region",
ADD COLUMN     "location_id" TEXT;

-- AlterTable
ALTER TABLE "job_posts" ADD COLUMN     "location_id" TEXT;

-- AlterTable
ALTER TABLE "waiters" DROP COLUMN "country",
DROP COLUMN "province",
DROP COLUMN "region",
ADD COLUMN     "location_id" TEXT;

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "iso_code" TEXT NOT NULL,
    "state" TEXT,
    "region" TEXT,
    "province" TEXT,
    "county" TEXT,
    "canton" TEXT,
    "district" TEXT,
    "municipality" TEXT,
    "city" TEXT,
    "neighborhood" TEXT,
    "postal_code" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_location_id_key" ON "companies"("location_id");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waiters" ADD CONSTRAINT "waiters_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_posts" ADD CONSTRAINT "job_posts_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
