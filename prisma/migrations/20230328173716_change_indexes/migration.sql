-- CreateIndex
CREATE INDEX "Answer_user_answer_id_idx" ON "Answer"("user_answer_id");

-- CreateIndex
CREATE INDEX "Question_user_question_id_idx" ON "Question"("user_question_id");

-- CreateIndex
CREATE INDEX "Room_user_creator_id_idx" ON "Room"("user_creator_id");

-- CreateIndex
CREATE INDEX "User_nickname_email_password_idx" ON "User"("nickname", "email", "password");
