/*
  Warnings:

  - You are about to drop the column `street_address` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `job_posts` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `job_posts` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `job_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "street_address";

-- AlterTable
ALTER TABLE "job_posts" DROP COLUMN "country",
DROP COLUMN "province",
DROP COLUMN "region";

-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "street_address" TEXT;
