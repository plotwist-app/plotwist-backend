ALTER TABLE "reviews" ALTER COLUMN "review" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "rating" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "has_spoilers" SET DEFAULT false;