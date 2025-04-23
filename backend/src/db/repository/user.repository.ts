import { Database } from "..";
import { CreateUser }


export class UserRepository{
    constructor(private readonly database: Database){}
}