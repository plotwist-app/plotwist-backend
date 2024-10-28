DO $$ BEGIN
 CREATE TYPE "public"."list_visibility" AS ENUM('PUBLIC', 'NETWORK', 'PRIVATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
