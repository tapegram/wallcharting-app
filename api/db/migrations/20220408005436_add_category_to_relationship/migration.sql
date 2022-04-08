/*
  Warnings:

  - Added the required column `category` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relationship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "leftId" INTEGER NOT NULL,
    "rightId" INTEGER NOT NULL,
    CONSTRAINT "Relationship_leftId_fkey" FOREIGN KEY ("leftId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Relationship_rightId_fkey" FOREIGN KEY ("rightId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Relationship" ("id", "leftId", "rightId") SELECT "id", "leftId", "rightId" FROM "Relationship";
DROP TABLE "Relationship";
ALTER TABLE "new_Relationship" RENAME TO "Relationship";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
