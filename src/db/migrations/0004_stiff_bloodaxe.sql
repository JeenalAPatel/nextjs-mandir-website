CREATE TABLE IF NOT EXISTS "slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"slotName" varchar(255) NOT NULL,
	"region" varchar(255) NOT NULL,
	"wing" varchar(255) DEFAULT 'Female' NOT NULL,
	"mandal" varchar(255) NOT NULL,
	"capacity" varchar(255) NOT NULL,
	"slotType" varchar(255) DEFAULT 'Regular' NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"notes" varchar(255),
	"active" boolean DEFAULT true NOT NULL
);
