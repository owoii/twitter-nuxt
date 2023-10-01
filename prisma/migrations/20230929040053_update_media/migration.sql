/*
  Warnings:

  - The primary key for the `MediaFile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MediaFile" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "providerPublicId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "tweetId" TEXT,
    CONSTRAINT "MediaFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MediaFile_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet" ("_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MediaFile" ("_id", "createdAt", "providerPublicId", "tweetId", "updatedAt", "url", "userId") SELECT "_id", "createdAt", "providerPublicId", "tweetId", "updatedAt", "url", "userId" FROM "MediaFile";
DROP TABLE "MediaFile";
ALTER TABLE "new_MediaFile" RENAME TO "MediaFile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
