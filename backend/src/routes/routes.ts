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
    //default route
    this.router.get('/', (req,res) => {
      res.status(200).json({message: 'Travel app is running'});
    });

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

    //all travels
    this.router.get('/travels',
      (req,res,next) => {
        this.travelController.getAllTravelsController(req,res).catch(next);
    });

    this.router.post('/travels',
      (req,res,next) => {
        this.travelController.createTravelController(req,res).catch(next);
      })

    //add destination to travel
    
    this.router.post('/travels/:travelId/:destinations',
      (req,res,next) => {
        this.travelController.addDestination(req,res).catch(next);
    });

    //remove destination from travel
    this.router.delete('/travels/:travelId/destinations',
      (req,res,next) => {
        this.travelController.removeDestination(req,res).catch(next);
    }); 

    //get travel by name
    this.router.get('/travels/name/:travelName',
      (req,res,next) => {
        this.travelController.getTravelByNameController(req,res).catch(next);
    });

    //all travels that has a specific destination
    this.router.get('/travels/destination/:destinationId',
      (req,res,next) => {
        this.travelController.getTravelsByDestinationIdController(req,res).catch(next);
    });
  }

  public getRouter(): Router{
    return this.router;
  }
}