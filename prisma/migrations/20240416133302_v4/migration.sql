/*
  Warnings:

  - You are about to drop the `Carts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Carts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CartItems" (
    "uid" INTEGER NOT NULL,
    "pid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("uid", "pid"),
    CONSTRAINT "CartItems_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartItems_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
