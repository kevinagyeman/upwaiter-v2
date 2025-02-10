/*
  Warnings:

  - A unique constraint covering the columns `[waiter_id,job_post_id]` on the table `applications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "applications_waiter_id_job_post_id_key" ON "applications"("waiter_id", "job_post_id");
