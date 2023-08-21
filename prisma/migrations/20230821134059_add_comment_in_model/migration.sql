/*
  Warnings:

  - Added the required column `comment` to the `IssueComment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IssueComment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "issueId" TEXT NOT NULL,
    "userId" TEXT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,
    CONSTRAINT "IssueComment_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IssueComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IssueComment" ("data", "id", "issueId", "userId") SELECT "data", "id", "issueId", "userId" FROM "IssueComment";
DROP TABLE "IssueComment";
ALTER TABLE "new_IssueComment" RENAME TO "IssueComment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
