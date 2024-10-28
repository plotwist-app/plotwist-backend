CREATE TABLE IF NOT EXISTS "likes" (
	"id" text PRIMARY KEY NOT NULL,
	"entity_type" varchar NOT NULL,
	"review_id" uuid,
	"review_reply_id" uuid,
	"user_id" uuid NOT NULL
);
