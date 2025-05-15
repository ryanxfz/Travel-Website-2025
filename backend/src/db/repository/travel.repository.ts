import { db, type Database } from '..';
import { and, eq, inArray } from "drizzle-orm";
import { travelDestination } from '../schema/travel_to_destination.schema';
import { travel } from '../schema/travel.schema';

export class TravelRepository {
    constructor(private readonly database: Database) {}

    async removeTravel(travelId: string){
        await db.delete(travel).where(eq(travel.id, travelId));
    }

    async findAllTravels() {
        return await db.select().from(travel).execute();
    }

    async findTravelById(travelId: string){
       const travelData = await db.select().from(travel).where(eq(travel.id, travelId));
       return travelData[0];
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