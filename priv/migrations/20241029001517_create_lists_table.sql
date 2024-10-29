DO $$ BEGIN
 CREATE TYPE "public"."list_visibility" AS ENUM('PUBLIC', 'NETWORK', 'PRIVATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lists" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar,
	"user_id" uuid NOT NULL,
	"description" varchar,
	"cover_path" varchar,
	"visibility" "list_visibility" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
