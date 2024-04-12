-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrdersOnProducts" (
    "oid" INTEGER NOT NULL,
    "pid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("oid", "pid"),
    CONSTRAINT "OrdersOnProducts_oid_fkey" FOREIGN KEY ("oid") REFERENCES "Orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrdersOnProducts_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrdersOnProducts" ("oid", "pid", "quantity") SELECT "oid", "pid", "quantity" FROM "OrdersOnProducts";
DROP TABLE "OrdersOnProducts";
ALTER TABLE "new_OrdersOnProducts" RENAME TO "OrdersOnProducts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
