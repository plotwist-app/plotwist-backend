CREATE TABLE IF NOT EXISTS "followers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"follower_id" uuid NOT NULL,
	"followed_id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
