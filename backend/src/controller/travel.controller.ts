import {Request, Response} from 'express';
import { travelDestinationZodSchema } from '../validation/validation';
import { TravelRepository } from '../db/repository/travel.repository';
import { destination } from '../db/schema/destination.schema';

export class TravelController{
    constructor(private repository: TravelRepository){}

    async postDestination(req: Request, res: Response){
        const validation = travelDestinationZodSchema.addDestination.safeParse({
            travelId: req.params.travelId,
            destinationId: req.body.destinationId,
        });

        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            await this.repository.insertDestinations(validation.data.travelId, validation.data.destinationId);
            return res.status(204).end();
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

    async deleteDestination(req: Request, res: Response){
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

    async postTravel(req: Request, res: Response){
        const validation = travelDestinationZodSchema.createTravel.safeParse(req.body);
        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }
        try {
            const newTravel = await this.repository.insertTravel(validation.data);
            return res.status(201).json(newTravel); // Return the created travel
        } catch (error) {
            console.error("Creation error:", error); // Add logging
            return res.status(500).json({
                error: "Error: Database Operation Failed",
            });
        }
    }

    async getAllTravels(req: Request, res: Response){
        try{
            const travels = await this.repository.findAllTravels();
            return res.status(200).json(travels);
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

    async getTravelByName(req: Request, res: Response){
        const validation = travelDestinationZodSchema.getTravelByName.safeParse({
            travelName: req.params.travelName,
        });

        if(!validation.success){
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            const travel = await this.repository.findTravelByName(validation.data.travelName);
            return res.status(200).json(travel);
        }catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }

    async getTravelsByDestinationId(req: Request, res: Response){
        const validation = travelDestinationZodSchema.getTravelsByDestination.safeParse({
            destinationId: req.params.destinationId,
        });

        if(!validation.success){
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            const travel = await this.repository.findTravelsByDestinationId(validation.data.destinationId);
            return res.status(200).json(travel);
        }catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
        }
    }
    
}