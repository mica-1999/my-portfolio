-- CreateEnum
CREATE TYPE "ProjectState" AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED');

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "state" "ProjectState" NOT NULL DEFAULT 'PLANNING';
