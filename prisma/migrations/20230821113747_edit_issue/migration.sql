/*
  Warnings:

  - You are about to drop the column `dislike` on the `IssueComent` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `IssueComent` table. All the data in the column will be lost.
  - You are about to drop the column `dislike` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `statys` on the `Issue` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IssueComent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" TEXT NOT NULL,
    "userId" TEXT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IssueComent_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IssueComent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IssueComent" ("data", "id", "issueId", "userId") SELECT "data", "id", "issueId", "userId" FROM "IssueComent";
DROP TABLE "IssueComent";
ALTER TABLE "new_IssueComent" RENAME TO "IssueComent";
CREATE TABLE "new_Issue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fixed" BOOLEAN NOT NULL DEFAULT false,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Issue" ("data", "description", "id", "title", "userId") SELECT "data", "description", "id", "title", "userId" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
