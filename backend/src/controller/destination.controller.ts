import { DestinationRepository } from "../db/repository/destination.repository";
import { createDestinationZodSchema } from "../validation/validation";
import { Request, Response } from "express";

export class DestinationController{
    constructor(private repository: DestinationRepository){}

    async createDestination(req: Request, res: Response){
        const validation = createDestinationZodSchema.safeParse(req.body);

        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            await this.repository.createDestination(validation.data);
            return res.status(201).end();
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

}