/*
  Warnings:

  - You are about to drop the column `category` on the `Relationship` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "RelationshipCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Relationship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "leftId" INTEGER NOT NULL,
    "rightId" INTEGER NOT NULL,
    CONSTRAINT "Relationship_leftId_fkey" FOREIGN KEY ("leftId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Relationship_rightId_fkey" FOREIGN KEY ("rightId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Relationship_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "RelationshipCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Relationship" ("id", "leftId", "rightId") SELECT "id", "leftId", "rightId" FROM "Relationship";
DROP TABLE "Relationship";
ALTER TABLE "new_Relationship" RENAME TO "Relationship";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
