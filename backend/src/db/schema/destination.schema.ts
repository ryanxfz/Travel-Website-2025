import { text, pgTable, date} from "drizzle-orm/pg-core";
import { commonSchema } from "./common.schema";
import { relations } from "drizzle-orm";
import { travelDestination } from "./travel_to_destination.schema";

export const destination = pgTable('destinations', {
    ...commonSchema,
    name: text('name').notNull(),
    description: text('description').notNull(),
    timePeriod: date('time_period').notNull(),
    activity: text('activity').notNull(),
    images: text('images').notNull(),
});

//relation
export const destinationsRelations = relations(destination, ({ many }) => ({
    travels: many(travelDestination), // Links to join table
  }));
