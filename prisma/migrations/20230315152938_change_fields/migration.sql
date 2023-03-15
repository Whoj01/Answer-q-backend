/*
  Warnings:

  - You are about to drop the column `Content_question` on the `Question` table. All the data in the column will be lost.
  - Added the required column `content_question` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "room_id" INTEGER NOT NULL,
    "user_question_id" INTEGER NOT NULL,
    "content_question" TEXT NOT NULL,
    CONSTRAINT "Question_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Question_user_question_id_fkey" FOREIGN KEY ("user_question_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("id", "room_id", "user_question_id") SELECT "id", "room_id", "user_question_id" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
