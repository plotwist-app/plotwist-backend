DO $$ BEGIN
 CREATE TYPE "public"."subscription_type" AS ENUM('MEMBER', 'PRO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar,
	"username" varchar NOT NULL,
	"banner_path" varchar,
	"subscription_type" "subscription_type",
	"image_path" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_email_unique" UNIQUE("email"),
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
