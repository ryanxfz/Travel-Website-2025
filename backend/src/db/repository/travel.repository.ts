import { db, type Database } from '..';
import { and, eq, inArray } from "drizzle-orm";
import { travelDestination } from '../schema/travel_to_destination.schema';

export class TravelRepository {
    async addDestinations(travelId: string, destinationIds: string[]){
        await db.insert(travelDestination).values(
            destinationIds.map(destinationId => ({
                travelId,
                destinationId,
            }))
        );
    }

    async removeDestinations(travelId: string, destinationIds: string[]) {
        await db.delete(travelDestination)
          .where(
            and(
              eq(travelDestination.travelId, travelId),
              inArray(travelDestination.destinationId, destinationIds)
            )
        );
    }
}