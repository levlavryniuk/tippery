ALTER TABLE "users" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "expires_at" TO "expiresAt";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "revoked_at" TO "revokedAt";--> statement-breakpoint
ALTER TABLE "refresh_tokens" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;