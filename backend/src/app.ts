import express, { Application } from 'express';
import { globalErrorHandler } from './utils/global.error';

export class App {
    private app: Application;

    constructor(){
        this.app = express();
        this.registerMiddlewares();
        this.registerErrorHandlers();
    }

    private registerMiddlewares(){
        this.app.use(express.json());

        this.app.use((req, res, next) => {
            console.info(`New Request to ${req.path}`);
            next();
        });
    }

    private registerErrorHandlers(){
        this.app.use(globalErrorHandler);
    }

    public listen(port: number, callback: () => void){
        return this.app.listen(port, callback);
    }
}
