/*
  Warnings:

  - You are about to drop the `_OrdersToProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_OrdersToProducts_B_index";

-- DropIndex
DROP INDEX "_OrdersToProducts_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_OrdersToProducts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OrdersOnProducts" (
    "oid" INTEGER NOT NULL,
    "pid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("oid", "pid"),
    CONSTRAINT "OrdersOnProducts_oid_fkey" FOREIGN KEY ("oid") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrdersOnProducts_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total_price" REAL NOT NULL,
    "order_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" INTEGER NOT NULL,
    CONSTRAINT "Orders_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("id", "total_price", "uid") SELECT "id", "total_price", "uid" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
