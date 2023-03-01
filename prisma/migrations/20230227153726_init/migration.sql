/*
  Warnings:

  - You are about to drop the column `id_courses` on the `guilds` table. All the data in the column will be lost.
  - Added the required column `id_guilds` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ticket_state` on the `ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "guilds" DROP CONSTRAINT "guilds_courses_fk";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "id_guilds" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "guilds" DROP COLUMN "id_courses";

-- AlterTable
ALTER TABLE "promo" ADD COLUMN     "code_request" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "signature" ADD COLUMN     "id_learner" INTEGER,
ADD COLUMN     "id_trainer" INTEGER;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "ticket_state",
ADD COLUMN     "ticket_state" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_guilds_fk" FOREIGN KEY ("id_guilds") REFERENCES "guilds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "signature" ADD CONSTRAINT "learner_pk" FOREIGN KEY ("id_learner") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signature" ADD CONSTRAINT "trainer_pk" FOREIGN KEY ("id_trainer") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
