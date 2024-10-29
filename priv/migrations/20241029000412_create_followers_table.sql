CREATE TABLE IF NOT EXISTS "followers" (
	"id" text PRIMARY KEY NOT NULL,
	"follower_id" uuid NOT NULL,
	"followed_id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
