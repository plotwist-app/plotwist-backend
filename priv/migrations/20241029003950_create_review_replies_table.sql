CREATE TABLE IF NOT EXISTS "review_replies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"reply" varchar,
	"review_id" uuid NOT NULL
);
