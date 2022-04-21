/*
  Warnings:

  - You are about to drop the column `savedImageNotifId` on the `Image` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `SavedImageNotif` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("category", "id", "link", "title", "userId") SELECT "category", "id", "link", "title", "userId" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new_SavedImageNotif" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "imageId" INTEGER NOT NULL,
    CONSTRAINT "SavedImageNotif_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavedImageNotif_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavedImageNotif_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SavedImageNotif" ("id", "receiverId", "senderId") SELECT "id", "receiverId", "senderId" FROM "SavedImageNotif";
DROP TABLE "SavedImageNotif";
ALTER TABLE "new_SavedImageNotif" RENAME TO "SavedImageNotif";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
