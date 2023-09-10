/*
  Warnings:

  - You are about to drop the column `description_en` on the `Claim` table. All the data in the column will be lost.
  - You are about to drop the column `description_ru` on the `Claim` table. All the data in the column will be lost.
  - You are about to drop the column `description_ua` on the `Claim` table. All the data in the column will be lost.
  - You are about to drop the column `name_en` on the `Claim` table. All the data in the column will be lost.
  - You are about to drop the column `name_ru` on the `Claim` table. All the data in the column will be lost.
  - You are about to drop the column `name_ua` on the `Claim` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Claim" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roleId" TEXT NOT NULL,
    "claim" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Claim_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Claim" ("claim", "createDate", "id", "roleId") SELECT "claim", "createDate", "id", "roleId" FROM "Claim";
DROP TABLE "Claim";
ALTER TABLE "new_Claim" RENAME TO "Claim";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
