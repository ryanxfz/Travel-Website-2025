import { initaliseDependencyInjection, DI } from "./dependency-injection";
initaliseDependencyInjection();

try{
    DI.server.start();
}catch(error){
    console.error('Error starting server:', error);
    process.exit(1);
}