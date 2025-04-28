import { db } from "..";

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
}