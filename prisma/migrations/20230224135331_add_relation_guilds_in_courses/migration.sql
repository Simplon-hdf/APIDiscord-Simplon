-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_guilds_fk" FOREIGN KEY ("id_guilds") REFERENCES "guilds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
