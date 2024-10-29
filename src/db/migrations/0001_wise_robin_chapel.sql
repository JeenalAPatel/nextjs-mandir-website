ALTER TABLE "users" RENAME COLUMN "name" TO "firstname";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastname" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cellphone" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "region" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "center" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "AgeGroup" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "RegistrationDate" date NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "Status" varchar(255) NOT NULL;