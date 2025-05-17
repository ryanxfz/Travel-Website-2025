import {Request, Response} from 'express';
import { TravelToDestinationRepository } from '../db/repository/travel_to_destination';
import { TravelRepository } from '../db/repository/travel.repository';
import { DestinationRepository } from '../db/repository/destination.repository';
import { travelDestinationZodSchema } from '../validation/validation';

export class TravelToDestinationController {
    constructor(
        private repository: TravelToDestinationRepository,
    ){}
    
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

    async updateDestinationInTravel(req: Request, res: Response) {
    const { travelId, destinationId } = req.params;
    const updateData = req.body;
    try {
        const updated = await this.repository.updateDestinationInTravel(travelId, destinationId, updateData);
        if (!updated) return res.status(404).json({ error: "Destination not found in this travel" });
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: "Failed to update destination in travel" });
    }
    }

}