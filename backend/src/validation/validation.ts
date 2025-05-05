import { z } from "zod";

const uuidSchema = z.string().uuid("Invalid UUID format");

export const createDestinationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    timePeriod: z.string().min(1, { message: "Time period is required" }),
    activity: z.string().min(1, { message: "Activity is required" }),
    images: z.string().min(1, { message: "Images are required" }),
});

export const deleteDestinationZodSchema = z.object({
    destinationId: uuidSchema,
});

export const travelDestinationZodSchema = {
    addDestination: z.object({
        travelId: uuidSchema,
        destinationId: z.array(uuidSchema).min(1, {
            message: "At least one destination is required",
        })
    }),
    removeDestination: z.object({
        travelId: uuidSchema,
        destinationId: z.array(uuidSchema).min(1, {
            message: "At least one destination is required",
        })
    }),
    getTravelsByDestination: z.object({
        destinationId: uuidSchema
    }),

    getTravelByName: z.object({
        travelName: z.string().min(1, { message: "Travel name is required" })
    }),

    createTravel: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        timePeriod: z.string().min(1),
        images: z.string().min(1),
        participants: z.string().min(1)
    })
}

export type createDestination = z.infer<typeof createDestinationZodSchema>;
export type addTravelDestination = z.infer<typeof travelDestinationZodSchema.addDestination>;
export type removeTravelDestination = z.infer<typeof travelDestinationZodSchema.removeDestination>;
export type getTravelsByDestination = z.infer<typeof travelDestinationZodSchema.getTravelsByDestination>;