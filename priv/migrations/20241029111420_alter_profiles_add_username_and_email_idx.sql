CREATE INDEX IF NOT EXISTS "email_idx" ON "profiles" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_idx" ON "profiles" USING btree ("username");