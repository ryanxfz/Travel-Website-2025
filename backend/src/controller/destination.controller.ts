import { DestinationRepository } from "../db/repository/destination.repository";
import { createDestinationZodSchema, deleteDestinationZodSchema } from "../validation/validation";
import { Request, Response } from "express";

export class DestinationController{
    constructor(private repository: DestinationRepository){}

    async postDestination(req: Request, res: Response){
        const validation = createDestinationZodSchema.safeParse(req.body);
        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }
        try {
            const newDestination = await this.repository.insertDestination(validation.data);
            return res.status(201).json(newDestination); // Return the created destination
        } catch (error) {
            console.error("Creation error:", error); // Add logging
            return res.status(500).json({
                error: "Error: Database Operation Failed",
            });
        }
    }

    async deleteDestination(req: Request, res: Response){
        const validation = deleteDestinationZodSchema.safeParse({
            destinationId: req.params.destinationId,
        });

        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            await this.repository.removeDestination(validation.data.destinationId);
            return res.status(204).json({message: "Deletion Succesful"});
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed (Delete Destination)"});
        }
    }

    async getDestinationsByName(req: Request, res: Response){
        const name = req.params.destinationName;
        try{
            const destinations = await this.repository.findDestinationByName(name);
            return res.status(200).json(destinations);
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed (Get By Name)"});
        }
    }

    async getDestinationsById(req: Request, res: Response){
        try{
            const id = req.params.destinationId;
            const destinations = await this.repository.findDestinationById(id);
            return res.status(200).json(destinations);
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed (Get By ID)"});
        }
    }

    async getAllDestinations(req: Request, res: Response){
        try{
            const destinations = await this.repository.findAllDestinations();
            return res.status(200).json(destinations);
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed (Get All Destinations)"});
        }
    }

    async updateDestination(req: Request, res: Response) {
        const { destinationId } = req.params;
        const updateData = req.body;
        try {
            const updated = await this.repository.updateDestination(destinationId, updateData);
            if (!updated) return res.status(404).json({ error: "Destination not found" });
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update destination" });
        }
    }
}