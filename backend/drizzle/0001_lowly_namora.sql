CREATE TABLE "travels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"name" text NOT NULL,
	"time_period" date NOT NULL,
	"description" text NOT NULL,
	"images" text NOT NULL,
	"participants" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "travel_to_destination" (
	"travel_id" uuid NOT NULL,
	"destination_id" uuid NOT NULL,
	CONSTRAINT "travel_to_destination_travel_id_destination_id_pk" PRIMARY KEY("travel_id","destination_id")
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "destinations";--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "time_period" date NOT NULL;--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "activity" text NOT NULL;--> statement-breakpoint
ALTER TABLE "destinations" ADD COLUMN "images" text NOT NULL;--> statement-breakpoint
ALTER TABLE "travel_to_destination" ADD CONSTRAINT "travel_to_destination_travel_id_travels_id_fk" FOREIGN KEY ("travel_id") REFERENCES "public"."travels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "travel_to_destination" ADD CONSTRAINT "travel_to_destination_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "destinations" DROP COLUMN "email";--> statement-breakpoint
ALTER TABLE "destinations" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "destinations" DROP COLUMN "first_name";--> statement-breakpoint
ALTER TABLE "destinations" DROP COLUMN "last_name";