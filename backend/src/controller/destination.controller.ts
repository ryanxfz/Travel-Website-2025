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
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

    async getDestinationsById(req: Request, res: Response){
        try{
            const id = req.params.destinationId;
            const destinations = await this.repository.findDestinationById(id);
            return res.status(200).json(destinations);
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

    async getAllDestinations(req: Request, res: Response){
        try{
            const destinations = await this.repository.findAllDestinations();
            return res.status(200).json(destinations);
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

}