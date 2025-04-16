// @ts-ignore
import express from "express";
import { drizzle } from "drizzle-orm/node-postgres"
import { ENV } from "../config/env.config";

const app = express();

//const db = drizzle(ENV.DATABASE_URL)

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(ENV.PORT, () =>{
    console.log(`Server is running in port ${ENV.PORT}`)
})