import express, { Application } from "express" 
import dotenv from "dotenv"
import db from "./config/db"
import { mainApp } from "./mainApp"
dotenv.config()

const app : Application = express()
const port : number = parseInt(process.env.PORT!)

mainApp(app)

const server = app.listen(port, ()=>{
db()
})

process.on("uncaughtException", (err : any)=>{
    console.log("error happening due to uncaughtException", err);
    process.exit(-1)
})

process.on("unhandledRejection", (err : any)=>{
    console.log("error happening due to unhandledRejection", err);
    
    server.close(()=>{
        process.exit(-1)
    })
})
