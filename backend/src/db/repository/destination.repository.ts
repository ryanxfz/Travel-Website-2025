import { eq } from "drizzle-orm";
import { Database, db } from "..";
import { destination } from "../schema/destination.schema";

export class DestinationRepository{
    constructor(private readonly database: Database) {}
    
    async createDestination(destination: any) {
        const { name, description, timePeriod, activity, images } = destination;
        const newDestination = {
            name,
            description,
            timePeriod,
            activity,
            images
        };
        await db.insert(destination).values(newDestination);
    }

    async deleteDestination(destinationId: string) {
        await db.delete(destination).where(eq(destination.id, destinationId));
    }

    async getAllDestinations(){
        const destinationData = await db.select().from(destination).execute();
        return destinationData;
    }
    
    async getDestinationById(destinationId: string) {
        const destinationData = await db.select().from(destination).where(eq(destination.id, destinationId)).execute();
        return destinationData[0];
    }
}