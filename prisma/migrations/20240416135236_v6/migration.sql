-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture_uri" TEXT NOT NULL,
    "volume" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "discontinued" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Products" ("amount", "brand", "description", "id", "name", "picture_uri", "price", "rating", "volume") SELECT "amount", "brand", "description", "id", "name", "picture_uri", "price", "rating", "volume" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
