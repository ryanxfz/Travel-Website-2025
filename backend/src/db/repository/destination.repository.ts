import { eq } from "drizzle-orm";
import { Database, db } from "..";
import { destination } from "../schema/destination.schema";

export class DestinationRepository{
    constructor(private readonly database: Database) {}
    
    async insertDestination(data: typeof destination.$inferInsert) {
        const [newDestination] = await this.database.insert(destination)
            .values(data)
            .returning();
        return newDestination;
    }
    
    async removeDestination(destinationId: string) {
        await db.delete(destination).where(eq(destination.id, destinationId));
    }

    async findAllDestinations(){
        const destinationData = await db.select().from(destination).execute();
        return destinationData;
    }
    
    async findDestinationById(destinationId: string) {
        const destinationData = await db.select().from(destination).where(eq(destination.id, destinationId)).execute();
        return destinationData[0];
    }
}