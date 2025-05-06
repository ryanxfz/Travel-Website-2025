import {Request, Response} from 'express';
import { travelDestinationZodSchema } from '../validation/validation';
import { TravelRepository } from '../db/repository/travel.repository';
import { destination } from '../db/schema/destination.schema';

export class TravelController{
    constructor(private repository: TravelRepository){}

    async addDestination(req: Request, res: Response){
        const validation = travelDestinationZodSchema.addDestination.safeParse({
            travelId: req.params.travelId,
            destinationId: req.body.destinationId,
        });

        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }
        
        try{
            await this.repository.addDestinations(validation.data.travelId, validation.data.destinationId);
            return res.status(204).end();
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

    async removeDestination(req: Request, res: Response){
        const validation = travelDestinationZodSchema.removeDestination.safeParse({
            travelId: req.params.travelId,
            destinationId: req.body.destinationId,
        });

        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            await this.repository.removeDestinations(validation.data.travelId, validation.data.destinationId);
            return res.status(204).end();
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed (removeDestinaiton)"});
        }
    }

    async createTravelController(req: Request, res: Response){
        const validation = travelDestinationZodSchema.createTravel.safeParse(req.body);
        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }
        try {
            const newTravel = await this.repository.createTravel(validation.data);
            return res.status(201).json(newTravel); // Return the created travel
        } catch (error) {
            console.error("Creation error:", error); // Add logging
            return res.status(500).json({
                error: "Error: Database Operation Failed",
            });
        }
    }

    async getAllTravelsController(req: Request, res: Response){
        try{
            const travels = await this.repository.getAllTravels();
            return res.status(200).json(travels);
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

    async getTravelByNameController(req: Request, res: Response){
        const validation = travelDestinationZodSchema.getTravelByName.safeParse({
            travelName: req.params.travelName,
        });

        if(!validation.success){
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            const travel = await this.repository.getTravelByName(validation.data.travelName);
            return res.status(200).json(travel);
        }catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

    async getTravelsByDestinationIdController(req: Request, res: Response){
        const validation = travelDestinationZodSchema.getTravelsByDestination.safeParse({
            destinationId: req.params.destinationId,
        });

        if(!validation.success){
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            const travel = await this.repository.getTravelsByDestinationId(validation.data.destinationId);
            return res.status(200).json(travel);
        }catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }
    
}