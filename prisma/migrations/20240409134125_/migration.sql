/*
  Warnings:

  - You are about to drop the `ProductCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pid` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductCategories";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pid" INTEGER NOT NULL,
    CONSTRAINT "Categories_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Categories" ("id", "name") SELECT "id", "name" FROM "Categories";
DROP TABLE "Categories";
ALTER TABLE "new_Categories" RENAME TO "Categories";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
