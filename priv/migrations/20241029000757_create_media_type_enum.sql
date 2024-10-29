DO $$ BEGIN
 CREATE TYPE "public"."media_type" AS ENUM('TV_SHOW', 'MOVIE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "list_items" ALTER COLUMN "media_type" SET DATA TYPE media_type;