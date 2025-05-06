import { db, type Database } from '..';
import { and, eq, inArray } from "drizzle-orm";
import { travelDestination } from '../schema/travel_to_destination.schema';
import { travel } from '../schema/travel.schema';

export class TravelRepository {
    constructor(private readonly database: Database) {}
    
    async insertDestinations(travelId: string, destinationIds: string[]){
        await db.insert(travelDestination).values(
            destinationIds.map(destinationId => ({
                travelId,
                destinationId,
            }))
        );

        const result = await db.select()
        .from(travelDestination)
        .where(
            and(
                eq(travelDestination.travelId, travelId), inArray(travelDestination.destinationId, destinationIds)
            )
        )
        
        return result;
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

    async findTravelsByDestinationId(destinationId: string) {
        return await db.select()
      .from(travel)
      .innerJoin(
        travelDestination,
        eq(travel.id, travelDestination.travelId)
      )
      .where(eq(travelDestination.destinationId, destinationId))
      .execute();
    }

    async findAllTravels() {
        return await db.select().from(travel).execute();
    }

    async findTravelByName(travelName: string) {
        return await db.select().from(travel).where(eq(travel.name, travelName)).execute();
    }

    async insertTravel(data: typeof travel.$inferInsert) {
        const [newTravel] = await this.database.insert(travel)
            .values(data)
            .returning();
        return newTravel;
    }
}