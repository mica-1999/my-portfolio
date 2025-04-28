-- CreateEnum
CREATE TYPE "TimelineEventType" AS ENUM ('LOGIN', 'LOGOUT', 'PROFILE_UPDATE', 'PASSWORD_CHANGE', 'PROJECT_CREATED', 'PROJECT_JOINED', 'PROJECT_UPDATED', 'TRANSACTION_MADE', 'ACCOUNT_CREATED', 'SETTINGS_CHANGED', 'NOTE_CREATED', 'MESSAGE_SENT', 'SYSTEM_NOTIFICATION');

-- CreateTable
CREATE TABLE "Timeline" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventType" "TimelineEventType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Timeline_userId_idx" ON "Timeline"("userId");

-- CreateIndex
CREATE INDEX "Timeline_eventType_idx" ON "Timeline"("eventType");

-- AddForeignKey
ALTER TABLE "Timeline" ADD CONSTRAINT "Timeline_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
