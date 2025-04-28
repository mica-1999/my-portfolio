-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER');

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProject" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "role" "ProjectRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserProject_userId_idx" ON "UserProject"("userId");

-- CreateIndex
CREATE INDEX "UserProject_projectId_idx" ON "UserProject"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProject_userId_projectId_key" ON "UserProject"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
