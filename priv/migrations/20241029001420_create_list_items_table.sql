DO $$ BEGIN
 CREATE TYPE "public"."media_type" AS ENUM('TV_SHOW', 'MOVIE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "list_items" (
	"id" text,
	"list_id" uuid NOT NULL,
	"title" varchar,
	"overview" varchar,
	"backdrop_path" varchar,
	"poster_path" varchar,
	"tmdb_id" integer,
	"media_type" "media_type",
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "list_items_id_list_id_pk" PRIMARY KEY("id","list_id")
);
