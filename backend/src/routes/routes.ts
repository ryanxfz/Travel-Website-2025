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

  }

  public getRouter(): Router{
    return this.router;
  }
}