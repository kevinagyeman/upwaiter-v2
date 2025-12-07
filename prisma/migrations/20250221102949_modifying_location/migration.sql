/*
  Warnings:

  - A unique constraint covering the columns `[location_id]` on the table `job_posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[location_id]` on the table `waiters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "job_posts_location_id_key" ON "job_posts"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "waiters_location_id_key" ON "waiters"("location_id");
