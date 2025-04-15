// @ts-ignore
import express from "express";
import { drizzle } from "drizzle-orm/node-postgres"

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(3000, () =>{
    console.log("Server running in port 3000")
})