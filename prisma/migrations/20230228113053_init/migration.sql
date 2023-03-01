/*
  Warnings:

  - Changed the type of `category_uuid` on the `category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ticket_state` on the `ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "category_uuid",
ADD COLUMN     "category_uuid" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "channels" ALTER COLUMN "channel_uuid" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "guilds" ALTER COLUMN "guild_uuid" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "message_uuid" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "role_uuid" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "ticket_state",
ADD COLUMN     "ticket_state" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "user_uuid" SET DATA TYPE BIGINT;
