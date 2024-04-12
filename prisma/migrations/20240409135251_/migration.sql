/*
  Warnings:

  - You are about to drop the column `pid` on the `Categories` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ProductCategories" (
    "pid" INTEGER NOT NULL,
    "cid" INTEGER NOT NULL,

    PRIMARY KEY ("pid", "cid"),
    CONSTRAINT "ProductCategories_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductCategories_cid_fkey" FOREIGN KEY ("cid") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Categories" ("id", "name") SELECT "id", "name" FROM "Categories";
DROP TABLE "Categories";
ALTER TABLE "new_Categories" RENAME TO "Categories";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
