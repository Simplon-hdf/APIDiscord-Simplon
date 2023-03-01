/*
  Warnings:

  - A unique constraint covering the columns `[id_messages]` on the table `ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ticket_id_messages_key" ON "ticket"("id_messages");
