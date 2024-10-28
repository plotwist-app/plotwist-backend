CREATE TABLE IF NOT EXISTS "lists" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar,
	"user_id" uuid NOT NULL,
	"description" varchar,
	"cover_path" varchar,
	"visibility" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
