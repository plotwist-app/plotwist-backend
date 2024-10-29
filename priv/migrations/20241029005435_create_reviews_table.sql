DO $$ BEGIN
 CREATE TYPE "public"."languages" AS ENUM('en-US', 'es-ES', 'fr-FR', 'it-IT', 'de-DE', 'pt-BR', 'ja-JP');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"tmdb_id" integer,
	"media_type" "media_type",
	"review" varchar,
	"rating" integer,
	"has_spoilers" boolean,
	"tmdb_title" varchar,
	"tmdb_poster_path" varchar,
	"tmdb_overview" varchar,
	"language" "languages"
);
--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "image_path" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "review_replies" ALTER COLUMN "reply" SET NOT NULL;