/*
  Warnings:

  - You are about to drop the column `room_name` on the `Room` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_creator_id" INTEGER NOT NULL,
    "CreatedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Room_user_creator_id_fkey" FOREIGN KEY ("user_creator_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Room" ("CreatedDate", "id", "user_creator_id") SELECT "CreatedDate", "id", "user_creator_id" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_id_key" ON "Room"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
