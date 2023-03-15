-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id" INTEGER NOT NULL,
    "user_answer_id" INTEGER NOT NULL,
    "content_answer" INTEGER NOT NULL,
    CONSTRAINT "Answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Answer_user_answer_id_fkey" FOREIGN KEY ("user_answer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Answer" ("content_answer", "id", "question_id", "user_answer_id") SELECT "content_answer", "id", "question_id", "user_answer_id" FROM "Answer";
DROP TABLE "Answer";
ALTER TABLE "new_Answer" RENAME TO "Answer";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "room_id" INTEGER NOT NULL,
    "user_question_id" INTEGER NOT NULL,
    "Content_question" TEXT NOT NULL,
    CONSTRAINT "Question_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Question_user_question_id_fkey" FOREIGN KEY ("user_question_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("Content_question", "id", "room_id", "user_question_id") SELECT "Content_question", "id", "room_id", "user_question_id" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
