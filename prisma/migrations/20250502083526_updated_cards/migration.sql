-- CreateEnum
CREATE TYPE "NoteStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "Complexity" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('DOCUMENTATION', 'ARTICLE', 'VIDEO', 'COURSE', 'BOOK', 'GITHUB_REPO', 'TUTORIAL', 'OTHER');

-- CreateTable
CREATE TABLE "SoftwareNotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "NoteStatus" NOT NULL DEFAULT 'PLANNED',
    "category" TEXT NOT NULL,
    "subcategories" TEXT[],
    "complexity" "Complexity" NOT NULL DEFAULT 'INTERMEDIATE',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "progress" INTEGER NOT NULL DEFAULT 0,
    "personalNotes" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SoftwareNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "type" "ResourceType" NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "softwareNoteId" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "softwareNoteId" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeSnippet" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "explanation" TEXT,
    "softwareNoteId" INTEGER NOT NULL,

    CONSTRAINT "CodeSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concept" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "softwareNoteId" INTEGER NOT NULL,

    CONSTRAINT "Concept_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SoftwareNotes_userId_idx" ON "SoftwareNotes"("userId");

-- CreateIndex
CREATE INDEX "SoftwareNotes_status_idx" ON "SoftwareNotes"("status");

-- CreateIndex
CREATE INDEX "SoftwareNotes_category_idx" ON "SoftwareNotes"("category");

-- CreateIndex
CREATE INDEX "Resource_softwareNoteId_idx" ON "Resource"("softwareNoteId");

-- CreateIndex
CREATE INDEX "Link_softwareNoteId_idx" ON "Link"("softwareNoteId");

-- CreateIndex
CREATE INDEX "CodeSnippet_softwareNoteId_idx" ON "CodeSnippet"("softwareNoteId");

-- CreateIndex
CREATE INDEX "Concept_softwareNoteId_idx" ON "Concept"("softwareNoteId");

-- AddForeignKey
ALTER TABLE "SoftwareNotes" ADD CONSTRAINT "SoftwareNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_softwareNoteId_fkey" FOREIGN KEY ("softwareNoteId") REFERENCES "SoftwareNotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_softwareNoteId_fkey" FOREIGN KEY ("softwareNoteId") REFERENCES "SoftwareNotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeSnippet" ADD CONSTRAINT "CodeSnippet_softwareNoteId_fkey" FOREIGN KEY ("softwareNoteId") REFERENCES "SoftwareNotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concept" ADD CONSTRAINT "Concept_softwareNoteId_fkey" FOREIGN KEY ("softwareNoteId") REFERENCES "SoftwareNotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
