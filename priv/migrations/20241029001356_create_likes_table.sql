DO $$ BEGIN
 CREATE TYPE "public"."like_entity" AS ENUM('REVIEW', 'REPLY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "likes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"entity_type" "like_entity" NOT NULL,
	"review_id" uuid,
	"review_reply_id" uuid,
	"user_id" uuid NOT NULL
);
