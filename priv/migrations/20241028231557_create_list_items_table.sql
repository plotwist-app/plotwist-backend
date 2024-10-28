CREATE TABLE IF NOT EXISTS "list_items" (
	"id" text PRIMARY KEY NOT NULL,
	"list_id" uuid PRIMARY KEY NOT NULL,
	"title" varchar,
	"overview" varchar,
	"backdrop_path" varchar,
	"poster_path" varchar,
	"tmdb_id" integer,
	"media_type" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
