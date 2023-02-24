-- CreateTable
CREATE TABLE "appartenir" (
    "id" INTEGER NOT NULL,
    "id_guilds" INTEGER NOT NULL,

    CONSTRAINT "appartenir_pk" PRIMARY KEY ("id","id_guilds")
);

-- CreateTable
CREATE TABLE "associer" (
    "id" INTEGER NOT NULL,
    "id_channels" INTEGER NOT NULL,

    CONSTRAINT "associer_pk" PRIMARY KEY ("id","id_channels")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category_uuid" VARCHAR(255) NOT NULL,
    "category_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "channel_name" VARCHAR(255) NOT NULL,
    "channel_uuid" INTEGER NOT NULL,
    "id_guilds" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "channels_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config" (
    "id" SERIAL NOT NULL,
    "config" VARCHAR(2000) NOT NULL,
    "id_courses" INTEGER NOT NULL,

    CONSTRAINT "config_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "course_name" VARCHAR(255) NOT NULL,
    "id_roles" INTEGER NOT NULL,
    "id_guilds" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guilds" (
    "id" SERIAL NOT NULL,
    "guild_uuid" INTEGER NOT NULL,
    "guild_name" VARCHAR(50) NOT NULL,
    "member_size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guilds_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inclure" (
    "id" INTEGER NOT NULL,
    "id_channels" INTEGER NOT NULL,

    CONSTRAINT "inclure_pk" PRIMARY KEY ("id","id_channels")
);

-- CreateTable
CREATE TABLE "link" (
    "id" SERIAL NOT NULL,
    "link" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "link_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "message_uuid" INTEGER NOT NULL,
    "message_content" VARCHAR(255) NOT NULL,
    "tag" VARCHAR(50),
    "id_users" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promo" (
    "id" SERIAL NOT NULL,
    "promo_state" BOOLEAN NOT NULL,
    "id_courses" INTEGER NOT NULL,
    "id_roles" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promo_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources_sharing" (
    "id" SERIAL NOT NULL,
    "up_vote" INTEGER NOT NULL,
    "down_vote" INTEGER NOT NULL,
    "id_channels" INTEGER NOT NULL,
    "id_users" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resources_sharing_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role_uuid" INTEGER NOT NULL,
    "role_name" VARCHAR(255) NOT NULL,
    "role_color" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signature" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "signature_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template" (
    "id" SERIAL NOT NULL,
    "id_category" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "ticket_tag" VARCHAR(255) NOT NULL,
    "ticket_state" BOOLEAN NOT NULL,
    "id_messages" INTEGER NOT NULL,
    "id_roles" INTEGER NOT NULL,
    "id_users" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,
    "user_uuid" INTEGER NOT NULL,
    "id_roles" INTEGER NOT NULL,
    "id_promo" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appartenir" ADD CONSTRAINT "appartenir_guilds0_fk" FOREIGN KEY ("id_guilds") REFERENCES "guilds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "appartenir" ADD CONSTRAINT "appartenir_users_fk" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "associer" ADD CONSTRAINT "associer_channels0_fk" FOREIGN KEY ("id_channels") REFERENCES "channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "associer" ADD CONSTRAINT "associer_template_fk" FOREIGN KEY ("id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_category0_fk" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_guilds_fk" FOREIGN KEY ("id_guilds") REFERENCES "guilds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "config" ADD CONSTRAINT "config_courses_fk" FOREIGN KEY ("id_courses") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_roles_fk" FOREIGN KEY ("id_roles") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inclure" ADD CONSTRAINT "inclure_channels0_fk" FOREIGN KEY ("id_channels") REFERENCES "channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inclure" ADD CONSTRAINT "inclure_messages_fk" FOREIGN KEY ("id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_users_fk" FOREIGN KEY ("id_users") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promo" ADD CONSTRAINT "promo_courses_fk" FOREIGN KEY ("id_courses") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promo" ADD CONSTRAINT "promo_roles0_fk" FOREIGN KEY ("id_roles") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resources_sharing" ADD CONSTRAINT "resources_sharing_channels_fk" FOREIGN KEY ("id_channels") REFERENCES "channels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "resources_sharing" ADD CONSTRAINT "resources_sharing_users0_fk" FOREIGN KEY ("id_users") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_category_fk" FOREIGN KEY ("id_category") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_messages_fk" FOREIGN KEY ("id_messages") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_roles0_fk" FOREIGN KEY ("id_roles") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_users1_fk" FOREIGN KEY ("id_users") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_promo0_fk" FOREIGN KEY ("id_promo") REFERENCES "promo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roles_fk" FOREIGN KEY ("id_roles") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
