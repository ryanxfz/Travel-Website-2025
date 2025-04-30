import { eq } from "drizzle-orm";
import { db } from "..";
import { destination } from "../schema/destination.schema";

export class DestinationRepository{
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
}