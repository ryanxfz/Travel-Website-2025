import { DI, intializeDependencyInjection } from './dependency-injection';
intializeDependencyInjection();

try{
    DI.server.start();
}catch(error){
    console.error('Error starting server:', error);
    process.exit(1);
}