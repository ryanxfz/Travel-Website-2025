import { db, type Database } from '..';
import { and, eq, inArray } from "drizzle-orm";
import { travelDestination } from '../schema/travel_to_destination.schema';
import { travel } from '../schema/travel.schema';

export class TravelRepository {
    constructor(private readonly database: Database) {}
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

    async getTravelsByDestinationId(destinationId: string) {
        return await db.select()
      .from(travel)
      .innerJoin(
        travelDestination,
        eq(travel.id, travelDestination.travelId)
      )
      .where(eq(travelDestination.destinationId, destinationId))
      .execute();
    }
}