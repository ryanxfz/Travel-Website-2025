import express, { Application } from 'express';
import { globalErrorHandler } from './utils/global.error';
import { Routes } from './routes/routes';
import helmet from 'helmet';
import cors from 'cors';

export class App {
    public readonly app: Application;

    constructor(private readonly routes: Routes){
        this.app = express();
        this.app.use(cors());
        this.registerMiddlewares();
        this.registerRoutes();
        //this.registerErrorHandlers();
    }

    private registerMiddlewares(){
        this.app.use(helmet());
        this.app.use(express.json());

        this.app.use((req, res, next) => {
            console.info(`New Request to ${req.path}`);
            next();
        });
    }

    private registerRoutes() {
        this.app.use('/api', this.routes.getRouter());
    }
    

    // private registerErrorHandlers(){
    //     this.app.use(globalErrorHandler(error, res, next));
    // }

    public listen(port: number, callback: () => void){
        return this.app.listen(port, callback);
    }
}
