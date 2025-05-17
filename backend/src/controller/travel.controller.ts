import {Request, Response} from 'express';
import { travelDestinationZodSchema } from '../validation/validation';
import { TravelRepository } from '../db/repository/travel.repository';
import { destination } from '../db/schema/destination.schema';

export class TravelController{
    constructor(private repository: TravelRepository){}

    async deleteTravel(req: Request, res: Response){
        const validation = travelDestinationZodSchema.deleteTravel.safeParse({
            travelId: req.params.travelId,
        });

        if(!validation.success) {
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            await this.repository.removeTravel(validation.data.travelId);
            return res.status(204).end();
        } catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
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

    async getTravelById(req: Request, res: Response){
        const validation = travelDestinationZodSchema.getTravelById.safeParse({
            travelId: req.params.travelId,
        });

        if(!validation.success){
            return res.status(400).json({ error: validation.error.errors });
        }

        try{
            const travel = await this.repository.findTravelById(validation.data.travelId);
            return res.status(200).json(travel);
        }catch (error){
            return res.status(500).json({error: "Error: Database Operation Failed"});
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

    async updateTravel(req: Request, res: Response) {
        const { travelId } = req.params;
        const updateData = req.body;
        try {
            const updated = await this.repository.updateTravel(travelId, updateData);
            if (!updated) return res.status(404).json({ error: "Travel not found" });
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update travel" });
        }
    }
    
}