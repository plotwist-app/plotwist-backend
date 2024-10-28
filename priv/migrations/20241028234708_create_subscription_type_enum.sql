DO $$ BEGIN
 CREATE TYPE "public"."subscription_type" AS ENUM('MEMBER', 'PRO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
