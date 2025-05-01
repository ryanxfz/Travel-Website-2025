import { Router } from 'express';
import { DestinationController } from '../controller/destination.controller';
import { TravelController } from '../controller/travel.controller';

export class Routes{
  private router: Router;

  constructor(
    private readonly destinationController: DestinationController,
    private readonly travelController: TravelController,
  ){
    this.router = Router();
    this.initializeRoutes();
  }
  
  private initializeRoutes(){
    //destination routes
    this.router.get('/destinations', 
      (req,res,next) => {
        this.destinationController.getAllDestinationsController(req,res).catch(next);
      });

    this.router.get('/destinations/:destinationId',
      (req,res,next) => {
        this.destinationController.getDestinationsByIdController(req,res).catch(next);
      });

    this.router.post('/destinations',
      (req,res,next) => {
        this.destinationController.createDestinationController(req,res).catch(next);
      });
    
    this.router.delete('/destinations/:destinationId',
      (req,res,next) => {
        this.destinationController.deleteDestinationController(req,res).catch(next);
      });

      //all travels that has a specific destination
    this.router.get('/travels/destination/:destinationId',
      (req,res,next) => {
        this.travelController.getTravelsByDestination(req,res).catch(next);
      });

  }

  public getRouter(): Router{
    return this.router;
  }
}