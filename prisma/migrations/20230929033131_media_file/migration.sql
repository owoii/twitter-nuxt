-- CreateTable
CREATE TABLE "MediaFile" (
    "_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "providerPublicId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL PRIMARY KEY,
    "tweetId" TEXT,
    CONSTRAINT "MediaFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MediaFile_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("_id") ON DELETE SET NULL ON UPDATE CASCADE
);
