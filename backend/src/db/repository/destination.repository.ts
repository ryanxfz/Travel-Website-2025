import { db, type Database } from '..';
import { eq } from "drizzle-orm";
import { travelDestination } from '../schema/travel_to_destination.schema';

export class DestinationRepository {
    async addDestinations(travelId: string, destinationIds: string[]){
        await db.insert(travelDestination).values(
            destinationIds.map(destinationId => ({
                travelId,
                destinationId,
            }))
        ).execute();
    }
}