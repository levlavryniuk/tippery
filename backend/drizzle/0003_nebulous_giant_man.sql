CREATE TABLE "donations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "donations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"jarId" integer NOT NULL,
	"userId" varchar(255),
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"transactionId" varchar(255) NOT NULL,
	"paymentMethod" "paymentMethod",
	"note" text,
	"isRefunded" boolean DEFAULT false NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"refundedAt" timestamp,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "jars" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jars_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"ownerId" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"minimalPrice" numeric(10, 2) NOT NULL,
	"totalAmount" numeric(15, 2) NOT NULL,
	"totalDonations" integer DEFAULT 0 NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
