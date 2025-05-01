import { eq } from "drizzle-orm";
import { Database, db } from "..";
import { destination } from "../schema/destination.schema";

export class DestinationRepository{
    constructor(private readonly database: Database) {}
    
    async createDestination(data: typeof destination.$inferInsert) {
        // Use this proper Drizzle ORM insert with returning
        const [newDestination] = await this.database.insert(destination)
            .values(data)
            .returning();
        return newDestination;
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