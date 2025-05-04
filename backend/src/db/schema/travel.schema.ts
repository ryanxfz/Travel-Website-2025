import { pgTable, serial, varchar, text, date } from "drizzle-orm/pg-core";
import { commonSchema } from "./common.schema";
import { destinationsRelations } from "./destination.schema";
import { travelDestination } from "./travel_to_destination.schema";
import { relations } from "drizzle-orm";

export const travel = pgTable('travels', {
    ...commonSchema,
    name: text('name').notNull(),
    timePeriod: date('time_period').notNull(),
    description: text('description').notNull(),
    images: text('images').notNull(),
    participants: text('participants').notNull(),
});

export const travelRelations = relations(travel,({many}) => ({
    destinations: many(travelDestination),
}));