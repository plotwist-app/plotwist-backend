DO $$ BEGIN
 CREATE TYPE "public"."import_item_status" AS ENUM('COMPLETED', 'FAILED', 'NOT_STARTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."import_status_enum" AS ENUM('PARTIAL', 'COMPLETED', 'FAILED', 'NOT_STARTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "status" ADD VALUE 'DROPPED';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_import_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"import_id" uuid NOT NULL,
	"media_type" "media_type" NOT NULL,
	"name" varchar NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"item_status" "status" NOT NULL,
	"status" "import_item_status" NOT NULL,
	"TMDB_ID" integer,
	"watched_episodes" integer,
	"series_episodes" integer,
	"__metadata" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_imports" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"itens_count" integer NOT NULL,
	"status" "import_status_enum" NOT NULL,
	"provider" varchar,
	"__metadata" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_import_items" ADD CONSTRAINT "user_import_items_import_id_user_imports_id_fk" FOREIGN KEY ("import_id") REFERENCES "public"."user_imports"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_imports" ADD CONSTRAINT "user_imports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
