ALTER TABLE "followers" ADD CONSTRAINT "followers_followed_id_follower_id_pk" PRIMARY KEY("followed_id","follower_id");--> statement-breakpoint
ALTER TABLE "followers" DROP COLUMN IF EXISTS "id";