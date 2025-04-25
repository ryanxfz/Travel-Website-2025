import { App } from './app';
import { ENV } from '../config/env.config';
import { Server } from './server';
import { Database, db } from './db';
import { PasswordHasher } from './utils/password-hasher';
import { Jwt } from './utils/jwt';
import { Routes } from './routes/routes';
import { UserRepository } from './db/repository/user.repository';
import { AuthController } from './controller/auth.controller';

export const DI = {} as {
    app: App;
    db: Database
    server: Server;
    routes: Routes;
    repositories: {
        user: UserRepository;
    };
    controllers: {
        auth: AuthController;
    };

    utils: {
        PasswordHasher: PasswordHasher;
        jwt: Jwt;
    };
};

export function intializeDependencyInjection() {
    DI.db = db;

    DI.utils = {
        PasswordHasher: new PasswordHasher(10),
        jwt: new Jwt(ENV.JWT_SECRET, {
            expiresIn: 3600,
            issuer: 'http://fwe.auth',
        }),
    };

    // Initialize repositories
    DI.repositories = {
        user: new UserRepository(DI.db),
    };

    // Initialize controllers
    DI.controllers = {
        auth: new AuthController(
        DI.repositories.user,
        DI.utils.PasswordHasher,
        DI.utils.jwt,
        ),
    };

    // Initialize routes
    DI.routes = new Routes(DI.controllers.auth);
    DI.app = new App(DI.routes);
    DI.server = new Server(DI.app, ENV);
}