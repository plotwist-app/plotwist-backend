CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"profile_id" uuid NOT NULL,
	"type" "subscription_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
