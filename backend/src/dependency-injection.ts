import { Database, db } from './db';
import { DestinationRepository } from './db/repository/destination.repository';
import { TravelRepository } from './db/repository/travel.repository';
import { TravelController } from './controller/travel.controller';
import { DestinationController } from './controller/destination.controller';
import { Routes } from './routes/routes';
import { App } from './app';
import { Server } from './server';
import { ENV } from '../config/env.config';

export const DI = {} as {
    app: App;
    db: Database;
    server: Server;
    routes: Routes;
    repositories: {
        destinationRepository: DestinationRepository;
        travelRepository: TravelRepository;
    };
    controllers: {
        travelController: TravelController;
        destinationController: DestinationController;
    };
}

export function initaliseDependencyInjection(){
    //initialise database
    DI.db = db;

    //initialise repos
    DI.repositories = {
        travelRepository: new TravelRepository(DI.db),
        destinationRepository: new DestinationRepository(DI.db),
    }

    //initialise controllers
    DI.controllers = {
        travelController: new TravelController(DI.repositories.travelRepository),
        destinationController: new DestinationController(DI.repositories.destinationRepository),
    }

    //initialise routes
    DI.routes = new Routes(
        DI.controllers.destinationController, 
        DI.controllers.travelController
    );

    //initialise app
    DI.app = new App(DI.routes);
    DI.server = new Server(DI.app, ENV);
}