/*
  Warnings:

  - You are about to drop the `Waiter` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vat_number]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "Waiter";

-- CreateTable
CREATE TABLE "waiters" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "waiters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waiters_email_key" ON "waiters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_vat_number_key" ON "companies"("vat_number");
