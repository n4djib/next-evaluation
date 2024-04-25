DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_email_idx" ON "user" ("email");