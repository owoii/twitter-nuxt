-- CreateTable
CREATE TABLE "Tweet" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT NOT NULL,
    "replyToId" TEXT,
    CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tweet_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "Tweet" ("_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
CREATE INDEX "Tweet_authorId_replyToId_idx" ON "Tweet"("authorId", "replyToId");
