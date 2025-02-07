-- AlterTable
ALTER TABLE "waiters" ADD COLUMN     "about" TEXT,
ADD COLUMN     "contact_number" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "first_language" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "resume" TEXT,
ADD COLUMN     "second_language" TEXT,
ADD COLUMN     "street_address" TEXT,
ADD COLUMN     "third_language" TEXT,
ADD COLUMN     "years_of_experience" INTEGER;
