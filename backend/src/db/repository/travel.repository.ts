import { db, type Database } from '..';
import { and, eq, inArray } from "drizzle-orm";
import { travelDestination } from '../schema/travel_to_destination.schema';
import { travel } from '../schema/travel.schema';
import { destination } from '../schema/destination.schema';

export class TravelRepository {
    constructor(private readonly database: Database) {}

    async removeTravel(travelId: string){
        await db.delete(travel).where(eq(travel.id, travelId));
    }

    async findAllTravels() {
    const travels = await db.select().from(travel).execute();

    // For each travel, fetch its destinations
    const travelsWithDestinations = await Promise.all(
        travels.map(async (t) => {
            const destinationLinks = await db.select()
                .from(travelDestination)
                .where(eq(travelDestination.travelId, t.id))
                .execute();

            const destinationIds = destinationLinks.map(link => link.destinationId);

            let destinations: any[] = [];
            if (destinationIds.length > 0) {
                destinations = await db.select()
                    .from(destination)
                    .where(inArray(destination.id, destinationIds))
                    .execute();
            }
            return { ...t, destinations };
        })
    );
    return travelsWithDestinations;
    }

    async findTravelById(travelId: string) {
    // Fetch the travel
    const travelData = await db.select().from(travel).where(eq(travel.id, travelId));
    const travelObj = travelData[0];
    if (!travelObj) return null;

    // Fetch destination links for this travel
    const destinationLinks = await db.select()
        .from(travelDestination)
        .where(eq(travelDestination.travelId, travelId))
        .execute();

    const destinationIds = destinationLinks.map(link => link.destinationId);

    let destinations: any[] = [];
    if (destinationIds.length > 0) {
        destinations = await db.select()
            .from(destination)
            .where(inArray(destination.id, destinationIds))
            .execute();
    }

    return { ...travelObj, destinations };
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

    async updateTravel(travelId: string, updateData: any) {
        const [updated] = await db.update(travel)
            .set(updateData)
            .where(eq(travel.id, travelId))
            .returning();
        return updated;
        }
}