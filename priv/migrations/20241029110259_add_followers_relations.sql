DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_follower_id_profiles_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_followed_id_profiles_id_fk" FOREIGN KEY ("followed_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
