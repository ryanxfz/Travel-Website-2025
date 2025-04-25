import { pgTable, serial, varchar, text, date } from "drizzle-orm/pg-core";
import { commonSchema } from "./common.schema";

export const travel = pgTable('travels', {
    ...commonSchema,
    name: text('name').notNull(),
    timePeriod: date('time_period').notNull(),
    description: text('description').notNull(),
    images: text('images').notNull(),
    participants: text('participants').notNull(),
});