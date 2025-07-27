-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "path" TEXT NOT NULL,
    "altText" TEXT,
    "uploadedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "softwareNoteId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Image_softwareNoteId_idx" ON "Image"("softwareNoteId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_softwareNoteId_fkey" FOREIGN KEY ("softwareNoteId") REFERENCES "SoftwareNotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
