DO $$ BEGIN
 CREATE TYPE "public"."like_entity" AS ENUM('REVIEW', 'REPLY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "likes" ALTER COLUMN "entity_type" SET DATA TYPE like_entity;