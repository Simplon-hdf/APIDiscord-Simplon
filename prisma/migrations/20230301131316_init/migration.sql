-- AlterTable
ALTER TABLE "category" ALTER COLUMN "category_uuid" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "channels" ALTER COLUMN "channel_uuid" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "guilds" ALTER COLUMN "guild_uuid" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "message_uuid" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "role_uuid" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "user_uuid" SET DATA TYPE VARCHAR(255);
