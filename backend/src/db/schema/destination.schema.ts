import { text, timestamp, pgTable, serial, date } from "drizzle-orm/pg-core";
import { commonSchema } from "./common.schema";

export const destination = pgTable('destinations', {
    ...commonSchema,
    name: text('name').notNull(),
    description: text('description').notNull(),
    timePeriod: date('time_period').notNull(),
    activity: text('activity').notNull(),
    images: text('images').notNull(),
});

