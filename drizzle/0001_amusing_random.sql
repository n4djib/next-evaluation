CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "user" ("email");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");