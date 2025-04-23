import { App } from './app';
import { ENV } from '../config/env.config';
import { Server } from './server';
import { Database, db } from './db';

export const DI = {} as {
    app: App;
    db: Database
    server: Server;
}

export function intializeDependencyInjection() {
    DI.app = new App();
    DI.db = db;
    DI.server = new Server(DI.app, ENV);
}