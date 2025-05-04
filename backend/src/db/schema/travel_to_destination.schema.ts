import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { destination } from "./destination.schema";
import { travel } from "./travel.schema";
import { relations } from "drizzle-orm";


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

export const travelToDestinationRelations = relations(
    travelDestination,
    ({ one }) => ({
      travel: one(travel, {
        fields: [travelDestination.travelId],
        references: [travel.id],
      }),
      destination: one(destination, {
        fields: [travelDestination.destinationId],
        references: [destination.id],
      }),
    })
  );