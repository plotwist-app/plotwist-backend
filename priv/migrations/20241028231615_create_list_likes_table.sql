CREATE TABLE IF NOT EXISTS "list_likes" (
	"id" text PRIMARY KEY NOT NULL,
	"list_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
