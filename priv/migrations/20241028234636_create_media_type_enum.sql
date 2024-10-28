DO $$ BEGIN
 CREATE TYPE "public"."media_type" AS ENUM('TV_SHOW', 'MOVIE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
