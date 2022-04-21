/*
  Warnings:

  - You are about to drop the `_UserSearchedFor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserSearchedFor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_Notifications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Notifications_AB_unique" ON "_Notifications"("A", "B");

-- CreateIndex
CREATE INDEX "_Notifications_B_index" ON "_Notifications"("B");
