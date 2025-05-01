import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { destination } from "./destination.schema";
import { travel } from "./travel.schema";


export const travelDestination = pgTable(
    'travel_to_destination', 
    {
    travelId: uuid("travel_id").notNull().references(() => travel.id, { onDelete: 'cascade' }),
    destinationId: uuid("destination_id").notNull().references(() => destination.id, { onDelete: 'cascade' }),
    },
    (t) => ({
        pk: primaryKey(t.travelId, t.destinationId),
    }),
);