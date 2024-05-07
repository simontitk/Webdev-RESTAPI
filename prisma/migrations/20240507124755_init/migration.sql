-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL DEFAULT 'Credit Card'
);
INSERT INTO "new_Users" ("city", "email", "first_name", "id", "last_name", "password", "payment_method", "phone", "street") SELECT "city", "email", "first_name", "id", "last_name", "password", "payment_method", "phone", "street" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
